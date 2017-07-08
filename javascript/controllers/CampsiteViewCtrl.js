app.controller("CampsiteViewCtrl", function ($location, $rootScope, $routeParams, $scope, MAPS_CONFIG, ParkFactory, CampsiteFactory, CommentFactory) {

    $scope.uName = $rootScope.user.username;

    $scope.editedCampsite = {
        campsiteId: $routeParams.campsiteId,
    };

    $scope.key = MAPS_CONFIG.mapsKey;
    $scope.editing = false;
    $scope.editingComment = false;
    $scope.comments = false;
    $scope.commentList = [];
    $scope.imageUpload = {};

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
            $scope.campsite.campsiteId = campsiteParams.campsiteId; /// Necessary?
            getSinglePark($scope.campsite.parkId);
            getMap($scope.campsite);
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

    let getMap = (campsite) => {
        let map;
        let parsedLat = Number(campsite.latitude);
        let parsedLong = Number(campsite.longitude);
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: parsedLat,
                lng: parsedLong
            },
            zoom: 12
        });
    };

    $scope.itemSave = () => {
        let newFile = {
            //uid: $rootScope.user.uid,
            base64code: $scope.file.base64,
            filetype: $scope.file.filetype,
            category: $scope.imageCategory
        };
        CampsiteFactory.fbAddImage(newFile, $scope.campsite).then((results) => {
            getSingleCampsite($scope.campsite);
        }).catch((error) => {
            console.log("image save error", error);
        });
    };

    let getAllComments = () => {
        CommentFactory.fbGetAllComments($routeParams.campsiteId).then((results) => {
            $scope.commentList = results;
        })
            .catch((error) => {
                console.log("getAllComments error", error);
            });
    };

    getAllComments();

    $scope.addComment = (newComment) => {
        CommentFactory.fbPostNewComment(newComment, $routeParams.campsiteId).then((resultz) => {
            getAllComments();
            $scope.newComment.text = "";
        })
            .catch((error) => {
                console.log("addComment error", error);
            });

    };

    $scope.editComment = (comment) => {
        CommentFactory.fbEditComment(comment).then(() => {
            getAllComments();
        }).catch((error) => {
            console.log("Add error", error);
        });
    };

    $scope.deleteComment = (id) => {
        CommentFactory.fbDeleteComment(id).then(() => {
            getAllComments();
        })
            .catch((error) => {
                console.log("deleteComment error", error);
            });
    };


});
