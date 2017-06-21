app.controller("NavCtrl", function($location, $scope, $rootScope) {

    $rootScope.tallNav = true;
    // //$scope.currentLocation = $location.path();
    // //$scope.homepage = true;

    // $scope.$apply(() => {
    //     $scope.homepage = $rootScope.tallNav;
    // });

    // if ($rootScope.tallNav === true) {
    //     console.log("Tall Navbar");
    // } else if ($rootScope.tallNav === false) {
    //     $scope.homepage = false;
    //     console.log("Short Navbar");
    // }

});
