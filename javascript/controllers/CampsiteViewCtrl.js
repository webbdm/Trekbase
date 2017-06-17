app.controller("CampsiteViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory, CampsiteFactory) {

    $scope.editedCampsite = {
        campsiteId: $routeParams.campsiteId,
    };

    $scope.editing = false;

    let getSinglePark = (id) => {
        ParkFactory.fbGetSinglePark(id).then((results) => {
                $scope.park = results;
            })
            .catch((error) => {
                console.log("getSinglePark error", error);
            });
    };

    let getSingleCampsite = (campsiteParams) => {
        CampsiteFactory.fbGetSingleCampsite(campsiteParams.campsiteId).then((results) => {
                $scope.campsite = results;
                $scope.editedCampsite = results;
                $scope.campsite.campsiteId = campsiteParams.campsiteId;
                getSinglePark($scope.campsite.parkId);
            })
            .catch((error) => {
                console.log("getSingleCampsite error", error);
            });
    };

    getSingleCampsite($routeParams);

    $scope.deleteCampsite = (Id) => {
        CampsiteFactory.fbDeleteCampsite(Id).then(() => {
                $location.url(`/park_view/${$scope.campsite.parkId}`);
            })
            .catch((error) => {
                console.log("creatNewCampsite error", error);
            });

    };

    $scope.editCampsite = () => {
        CampsiteFactory.fbEditCampsite($scope.editedCampsite).then(() => {
            //$location.url(``);
            getSingleCampsite($scope.editedCampsite);
        }).catch((error) => {
            console.log("Add error", error);
        });
    };

});
