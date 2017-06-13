app.controller("ParkListCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory) {

	$scope.allParks = [];

	let getAllParks = () => {
	 	ParkFactory.fbGetAllParks().then((results) => {
	 		$scope.allParks = results;
	 		console.log($scope.allParks);
	 	}).catch((error) => {
	 		console.log("error getting list of all parks", error);
	 	});
	};

	getAllParks();



    
});
