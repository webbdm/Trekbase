app.controller("ParkViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory) {

    $scope.park = {};

    let getSinglePark = () => {
        ParkFactory.fbGetSinglePark($routeParams.parkId).then((results) => {
            $scope.park = results;
        });
    };

    getSinglePark();


});
