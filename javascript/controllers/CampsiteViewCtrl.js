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
                $scope.campsite.campsiteId = $routeParams.campsiteId;
                getSinglePark();
            })
            .catch((error) => {
                console.log("getSingleCampsite error", error);
            });
    };

    getSingleCampsite();

    $scope.deleteCampsite = (Id) => {
    	console.log("test this", Id);
        CampsiteFactory.fbDeleteCampsite(Id).then(() => {
                console.log("Deleted", $scope.campsiteName);
                $location.url(`/park_view/${$scope.campsite.parkId}`);
            })
            .catch((error) => {
                console.log("creatNewCampsite error", error);
            });

    };

});