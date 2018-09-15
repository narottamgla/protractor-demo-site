
	myApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic multipart (/multipart)
        .state('multipart', {
            url: '/multipart',
            templateUrl: 'pages/multipart-registration.html',
            controller: 'multipartRegistrationController'
        })

		.state('multipart.profile', {
            url: '/profile',
            templateUrl: 'pages/form-profile.html'
        })

        // url will be /form/interests
        .state('multipart.interests', {
            url: '/interests',
            templateUrl: 'pages/form-interests.html'
        })

        // url will be /form/payment
        .state('multipart.payment', {
            url: '/payment',
            templateUrl: 'pages/form-payment.html'
        })

		.state('calculator', {
            url: '/calculator',
            templateUrl: 'pages/calculator.html',
            controller: 'calculatorController'
        })

		.state('table', {
            url: '/table',
            templateUrl: 'pages/table.html',
            controller: 'tableController'
        })

		.state('checkboxes', {
            url: '/checkboxes',
            templateUrl: 'pages/checkboxes.html',
            controller: 'checkboxesController'
        })

		.state('registration', {
            url: '/registration',
            templateUrl: 'pages/registration.html',
            controller: 'registrationController'
        })

		.state('home', {
            url: '/home',
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

		.state('loggedin', {
            url: '/loggedin',
            templateUrl: 'pages/loggedin.html',
            controller: 'loggedinController'
        })

        .state('banking', {
            url: '/banking',
            controller: 'bankingCtrl'
        })

        .state('main', {
            url: '/main',
            templateUrl: 'pages/banking/main.html',
            controller: 'mainCtrl'
        })

        .state('main.options', {
            url: '/login',
            templateUrl: 'pages/banking/options.html',
            controller: 'optionCtrl'
        })

		.state('main.mgrView', {
            url: '/manager',
            templateUrl: 'pages/banking/managerView.html',
            controller: 'managerViewCtrl'
        })

   		.state('main.mgrView.add', {
            url: '/addCust',
            templateUrl: 'pages/banking/newCustomer.html',
            controller: 'addCustomerCtrl'
        })

        .state('main.mgrView.account', {
            url: '/openAccount',
            templateUrl: 'pages/banking/openAccount.html',
            controller: 'openAccountCtrl'
        })

   		.state('main.mgrView.list', {
            url: '/list',
            templateUrl: 'pages/banking/customerList.html',
            controller: 'listCustomerCtrl'
        })

		.state('main.custView', {
            url: '/customer',
            templateUrl: 'pages/banking/customerView.html',
            controller: 'customerViewCtrl'
        })

   		.state('main.account', {
            url: '/account',
            templateUrl: 'pages/banking/account.html',
            controller: 'accountCtrl'
        })

   		.state('main.account.deposit', {
            url: '',
            templateUrl: 'pages/banking/depositTx.html',
            controller: 'depositCtrl'
        })

   		.state('main.account.withdrawl', {
            url: '',
            templateUrl: 'pages/banking/withdrawlTx.html',
            controller: 'withdrawlCtrl'
        })

        .state('main.list', {
            url: '/listTx',
            templateUrl: 'pages/banking/listTx.html',
            controller: 'listTransactionCtrl'
        })
    // catch all route
    // send users to the home page
    $urlRouterProvider.otherwise('/home');
})
