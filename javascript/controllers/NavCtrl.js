app.controller("NavCtrl", function($location, $scope, $rootScope) {


    // Initialize collapse button
    $(document).ready(function () {
        $(".button-collapse").sideNav();
    });

    $rootScope.tallNav = true;

});
