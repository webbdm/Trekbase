app.controller("CampsiteViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory, CampsiteFactory) {

	$scope.editedCampsite = {
        area: "",
        bathrooms: "",
        campsiteName: "",
        campsiteId: $routeParams.campsiteId,
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

    $scope.editCampsite = () => {
    	console.log($scope.editedCampsite);
		CampsiteFactory.fbEditCampsite($scope.editedCampsite).then(() => {
			//$location.url(``);
			getSingleCampsite();
			console.log($scope.editCampsite);

		}).catch((error) => {
			console.log("Add error", error);
		});
	};

});