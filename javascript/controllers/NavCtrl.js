app.controller("NavCtrl", function($location, $scope, $rootScope) {

	$scope.onHomepage = true;
	$scope.currentLocation = $location.path();
	console.log($scope.currentLocation);

	if($scope.currentLocation !== "/auth"){

		$scope.onHomepage = false;
		console.log("Not Homepage!");

	}

	$scope.text = "Capstone Project";

    
});
