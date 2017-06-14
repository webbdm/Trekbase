app.controller("ParkViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory) {

    $scope.park = {};
    $scope.campsites = [];

    let getSinglePark = () => {
        ParkFactory.fbGetSinglePark($routeParams.parkId).then((results) => {
                $scope.park = results;
            })
            .catch((error) => {
                console.log("getSinglePark error", error);
            });
    };

    getSinglePark();

    let getAllCampsites = () => {
        CampsiteFactory.fbgetAllCampsites().then((results) => {
                $scope.campsites = results;
            })
            .catch((error) => {
                console.log("getAllCampsites error", error);

            });
    };


});
