app.controller("CampsiteViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory, CampsiteFactory) {

    let getSinglePark = () => {
        ParkFactory.fbGetSinglePark($scope.campsite.parkId).then((results) => {
                $scope.park = results;
                console.log("Park is ",$scope.park);
            })
            .catch((error) => {
                console.log("getSinglePark error", error);
            });
    };

    let getSingleCampsite = () => {
        CampsiteFactory.fbGetSingleCampsite($routeParams.campsiteId).then((results) => {
                $scope.campsite = results;
                getSinglePark();
            })
            .catch((error) => {
                console.log("getSingleCampsite error", error);
            });
    };

    getSingleCampsite();

    $scope.deleteCampsite = () => {
        CampsiteFactory.fbDeleteCampsite($scope.campsiteId).then(() => {
                console.log("Delete", $scope.campsiteId);
                getAllCampsites();
            })
            .catch((error) => {
                console.log("creatNewCampsite error", error);
            });

    };

});