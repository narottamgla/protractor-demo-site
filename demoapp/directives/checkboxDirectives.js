angular.module('checkboxDirectives', [])

  // this directive enables fourway-binding for checkboxes
  // true > checked
  // false > unchecked
  // undefined > tristate / inditerminate
  // null > disabled checkbox
  .directive('triState', function($parse){
    return {
      restrict : 'A',
      link : function(scope, element, attrs) {
        scope.$watch(attrs.ngModel, function(newVal, oldVal) {
          if (newVal === null) {
            element.prop('checked', false);
            element.prop('disabled', true);
          }
          else if (newVal === undefined) {
            element.prop('checked', false);
            element.prop('indeterminate', true);
          } else {
            element.prop('checked', newVal);
            element.prop('indeterminate', false);
          }
        });
      }
    }
  })
  
  // this directive enabled parent/child relations between boolean models
  //   - if all children are true, the parent will be true
  //   - if all children are false, the parent will be false
  //   - if some children are true, the parent will be undefined
  //   - 'null' values will not be considered
  .directive('parentModel', function($parse, $timeout) {
    var initialized = false;

    var childToParent = {}
    var parentToChildren = {}
    var nodeLookup = {}
    var rootNodes = [];
    var leafNodes = [];
    
    function Node(scope, path){
      this.scope = scope;
      this.path = path;
      this.parentNode = null;
      this.childNodes = null;
      this.accessor = $parse(path);
      this.unwatch = null;
    }
    
    Node.prototype = {
      getValue : function(){
        return this.accessor(this.scope);
      },
      
      setValue : function(value){
        if (this.getValue() === null) // don't set value, if bound to 'null' (meaning 'disabled')
          return;
          
        this.accessor.assign(this.scope, value);
      },
      
      getRootNode : function(){
        if (this.parentNode === null)
          return this;
          
        return this.parentNode.getRootNode();
      },
      
      // register $watch on each node's ngModel path (recursive)
      // will only be called from root-nodes and trickle down
      startWatching : function(){
        if (this.unwatch)
          return;

        var self = this;
        this.unwatch = this.scope.$watch(this.path, function(newValue, oldValue){
          if (newValue === oldValue)
            return;
            
          self.changeHandler(newValue, oldValue);
        });
        
        angular.forEach(this.childNodes, function(node){
          node.startWatching();
        })
      },
      
      // remove $watch for each node's ngModel path (recursive)
      // will only be called from root-nodes and trickle down
      stopWatching : function(){
        if (!this.unwatch)
          return;
        
        this.unwatch();
        this.unwatch = null;
        
        angular.forEach(this.childNodes, function(node){
          node.stopWatching();
        })
      },
      
      changeHandler : function(newValue, oldValue){
        
        var rootNode = this.getRootNode();
        
        rootNode.stopWatching();
        
        this.updateParentState();
        this.updateChildStates(newValue);
        
        rootNode.startWatching();
      },
      
      updateState : function(){
        var states = this.childNodes.map(function(childNode) {
          return childNode.getValue();
        }).filter(function(val) {return val !== null;})
        
        var allChecked = states.reduce(function(it, current){ return it && current && current !== undefined}, true);
        var allUnchecked = states.reduce(function(it, current) { return it && !current && current !== undefined}, true);
        
        if (allChecked)
          this.setValue(true);
        else if (allUnchecked)
          this.setValue(false);
        else
          this.setValue(undefined);
          
        this.updateParentState();
      },
      
      updateParentState : function(){
        if (this.parentNode === null)
          return;
        
        this.parentNode.updateState();
      },
      
      updateChildStates : function(value){
        this.setValue(value);
        
        if (!this.childNodes)
          return;
        
        angular.forEach(this.childNodes, function(childNode){
          childNode.updateChildStates(value);
        })
      }
    }
    
    // helper for findScope()
    function hasPropertyPath(scope, modelPathSplit){
      var first = modelPathSplit[0];
      
      if (modelPathSplit.length == 1)
        return true;
        
      if (!scope.hasOwnProperty(first))
        return false;
        
      return hasPropertyPath(scope[first], modelPathSplit.splice(0, 1));
    }
    
    // find correct scope for a binding path (traverse up the chain)
    function findScope(scope, modelPath) {
      if (hasPropertyPath(scope, modelPath.split('.')))
        return scope;
      
      if (!scope.$parent)
        return null;
        
      return findScope(scope.$parent, modelPath);
    }
    
    // build lookup key for scope/path combination
    function key(scope, path){ 
      return scope.$id + '|' + path; 
    }
    
    // builds lookups for
    //   - parentKey > childKeys
    //   - childKey > parentKey
    //   - key > Node
    function collectRelations(parentScope, parentPath, childScope, childPath){
      var parentKey = key(parentScope, parentPath);
      var childKey = key(childScope, childPath);
      
      childToParent[childKey] = parentKey;
      if (!parentToChildren.hasOwnProperty(parentKey))
        parentToChildren[parentKey] = [];
        
      parentToChildren[parentKey].push(childKey);
      
      nodeLookup[childKey] = new Node(childScope, childPath);
      nodeLookup[parentKey] = new Node(parentScope, parentPath);
    }
    
    // find parent node for every node and append
    // set 'parentNode' property as well as 'childNodes' property
    // basically build a tree to traverse later on
    function buildHierarchies() {
      angular.forEach(parentToChildren, function(childKeys, parentKey){
        var parentNode = nodeLookup[parentKey];
        angular.forEach(childKeys, function(childKey){
          var childNode = nodeLookup[childKey];
          if (!parentNode.childNodes)
            parentNode.childNodes = [];

          if (parentNode.childNodes.indexOf(childNode) < 0)
            parentNode.childNodes.push(childNode);
            
          childNode.parentNode = parentNode;
        })
      })
    }
    
    // set initial checkbox states and start watching for changes
    function initializeStates() {
      // iterate all nodes and find rootnode(s) and leafnodes
      angular.forEach(nodeLookup, function(node){
        if (node.parentNode === null)
          rootNodes.push(node);
        
        if (node.childNodes === null)
          leafNodes.push(node);
      })
      
      // from all leaf nodes upwards: update parent and parent's parent
      angular.forEach(leafNodes, function(leafNode){
        leafNode.updateParentState();
      })
      
      // from all root nodes downard: start watching for changes
      angular.forEach(rootNodes, function(rootNode){
        rootNode.startWatching();
      })
    }
    
    return {
      restrict : 'A',
      link : function(scope, element, attrs){
        // first we collect all parent/child relations, before building a hierarchy
        // and start watching
        var parentScope = findScope(scope, attrs.parentModel);
        collectRelations(parentScope, attrs.parentModel, scope, attrs.ngModel);
        
        // this ensures that the following init calls are run after all other directives (of the same type) were linked'
        $timeout(function(){
          if (initialized)
            return;
          
          buildHierarchies();
          initializeStates();
          
          initialized = true;
        }, 0);
      }
    }
  })