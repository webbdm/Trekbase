app.controller("ParkViewCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory, CampsiteFactory) {

    $rootScope.tallNav = false;
    console.log($rootScope.tallNav);

    $scope.editedCampsite = {
        campsiteId: $routeParams.campsiteId,
    };

    $scope.editing = false;

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
                //console.log($scope.park);
                //getMap($scope.park);
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

    $scope.makeEdit = (park) =>{

        console.log("park", park);
        $scope.editedPark = park;

    };

    $scope.editPark = (park) =>{
        console.log(park);
    };

    // $scope.editPark = () => {
    //     //console.log("editing", $scope.editedPark);
    //     ParkFactory.fbEditPark($scope.editedPark).then(() => {
    //         //$location.url(``);
    //         console.log("edited ");
    //         getAllParks();
    //     }).catch((error) => {
    //         console.log("Add error", error);
    //     });
    // };

    $scope.createNewCampsite = () => {
        CampsiteFactory.fbCreateNewCampsite($scope.newCampsite).then(() => {
                getAllCampsites();
            })
            .catch((error) => {
                console.log("creatNewCampsite error", error);
            });

    };

    $scope.itemSave = () => {
        let newFile = {
            //uid: $rootScope.user.uid,
            base64code: $scope.file.base64,
            filetype: $scope.file.filetype,
            category: $scope.imageCategory
        };

        $scope.newCampsite.image = newFile;
        console.log("Test", $scope.newCampsite);
        // CampsiteFactory.fbAddImage(newFile, $scope.campsite).then((results) => {
        //     getSingleCampsite($scope.campsite);
        //     console.log(results, "Image saved");

        // }).catch((error) => {
        //     console.log("image save error", error);
        // });
    };

    let getMap = (park) => {
        let map;
        let parsedLat = Number(park.latitude);
        let parsedLong = Number(park.longitude);
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: parsedLat,
                lng: parsedLong
            },
            zoom: 12
        });
    };

});
