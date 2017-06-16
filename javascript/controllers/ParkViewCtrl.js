app.controller("ParkViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory, CampsiteFactory) {

    $scope.park = {};
    $scope.campsites = [];
    $scope.newCampsite = {
        area: "",
        bathrooms: "",
        campsiteName: "",
        features: "",
        fee: "",
        image: "",
        latitude: "",
        longitude: "",
        parkId: $routeParams.parkId,
        review: "",
        type: ""
    };

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
                $scope.campsites = results;
            })
            .catch((error) => {
                console.log("getAllCampsites error", error);
            });
    };

    getAllCampsites();

    $scope.createNewCampsite = () => {
        CampsiteFactory.fbCreateNewCampsite($scope.newCampsite).then(() => {
                console.log("HI");
                getAllCampsites();
            })
            .catch((error) => {
                console.log("creatNewCampsite error", error);
            });

    };

});
