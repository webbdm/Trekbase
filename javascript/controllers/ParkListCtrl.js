app.controller("ParkListCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory) {

    $rootScope.tallNav = false;
    console.log($rootScope.tallNav);

    $scope.allParks = [];
    $scope.editing = true;

    $scope.newPark = {
    	name: "",
        city: "",
        state: "",
        zip: "",
        image: "",
        latitude: "",
        longitude: "",
        uid: ""
    };

    // $scope.editedPark = {
    //     // name: "",
    //     // city: "",
    //     // state: "",
    //     // zip: "",
    //     // image: "",
    //     // latitude: "",
    //     // longitude: "",
    //     // uid: ""
    // };

    let getAllParks = () => {
        ParkFactory.fbGetAllParks().then((results) => {
            $scope.allParks = results;
        }).catch((error) => {
            console.log("error getting list of all parks", error);
        });
    };

    getAllParks();

    // $scope.editPark = () => {
    //     console.log("editing", $scope.editedPark);
    //     ParkFactory.fbEditPark($scope.editedPark).then(() => {
    //         //$location.url(``);

    //         getAllParks();
    //     }).catch((error) => {
    //         console.log("Add error", error);
    //     });
    // };

    $scope.addNewPark = () => {
    	console.log("Add new park", $scope.newPark);
        ParkFactory.fbPostNewPark($scope.newPark)
            .then(() => {
                getAllParks();
            })
            .catch((error)=>{
            	console.log("Create New Park Error", error);
            });
    };

    $scope.deletePark = (parkId) => {
    	ParkFactory.fbDeletePark(parkId).then(() => {
            getAllParks();
        }).catch((error) => {
            console.log("deletePark error", error);
        });

    };




});
