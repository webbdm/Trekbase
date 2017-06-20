app.controller("NavCtrl", function($location, $scope, $rootScope) {

	$scope.tallNav = true;
	$scope.currentLocation = $location.path();

	console.log($scope.currentLocation);

	// if($scope.currentLocation == "/auth"){

	// 	$scope.onHomepage = false;
	// 	console.log("Homepage!");

	// }else{

	// }

	$scope.text = "Capstone Project";

    
});
