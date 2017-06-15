app.controller("ParkViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory, CampsiteFactory) {

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
        CampsiteFactory.fbGetAllCampsites($routeParams.parkId).then((results) => {

                //$scope.$apply(() => {
                    $scope.campsites = results;
                //});

                
                console.log("CAMPSITE ", $scope.campsites);
            })
            .catch((error) => {
                console.log("getAllCampsites error", error);
            });
    };

    getAllCampsites();


});
