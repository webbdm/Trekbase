let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();
    }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
    firebase.initializeApp(FIREBASE_CONFIG);
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
        var logged = AuthFactory.isAuthenticated();
        var appTo;
        if (currRoute.originalPath) {
            appTo = currRoute.originalPath.indexOf('/auth') !== -1;
        }
        if (!appTo && !logged) {
            event.preventDefault();
            $location.path('/auth');
        }
    });
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/auth', {
            templateUrl: 'partials/login-view.html',
            controller: 'AuthCtrl'
        })
        .when('/home', {
            templateUrl: 'partials/home-view.html',
            controller: 'HomeCtrl'
        })
        .when('/search', {
            templateUrl: 'partials/park-search-view.html',
            controller: 'ParkSearchCtrl'
        })
        .when('/list', {
            templateUrl: 'partials/park-list-view.html',
            controller: 'ParkListCtrl'
        })
        .when('/park_view', {
            templateUrl: 'partials/park-view.html',
            controller: 'ParkViewCtrl'
        })
        .when('/campsite_view', {
            templateUrl: 'partials/campsite-view.html',
            controller: 'CampsiteViewCtrl'
        })
        .otherwise('/auth');
});
