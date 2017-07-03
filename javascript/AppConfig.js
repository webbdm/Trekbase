let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();
    }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, MAPS_CONFIG, AuthFactory) {
    firebase.initializeApp(FIREBASE_CONFIG);
    GoogleMapsLoader.KEY = MAPS_CONFIG.mapsKey;
    GoogleMapsLoader.load(function(google) {});
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
            //resolve: { isAuth }
        })
        .when('/home', {
            templateUrl: 'partials/home-view.html',
            controller: 'HomeCtrl',
            resolve: { isAuth }
        })
        .when('/search', {
            templateUrl: 'partials/park-search-view.html',
            controller: 'ParkSearchCtrl',
            resolve: { isAuth }
        })
        .when('/list', {
            templateUrl: 'partials/park-list-view.html',
            controller: 'ParkListCtrl',
            resolve: { isAuth }
        })
        .when('/park_view/:parkId', {
            templateUrl: 'partials/park-view.html',
            controller: 'ParkViewCtrl',
            resolve: { isAuth }
        })
        .when('/campsite_view/:campsiteId', {
            templateUrl: 'partials/campsite-view.html',
            controller: 'CampsiteViewCtrl',
            resolve: { isAuth }
        })
        .otherwise('/home');
});
