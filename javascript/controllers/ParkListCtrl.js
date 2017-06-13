app.controller("ParkListCtrl", function($location, $rootScope, $routeParams, $scope, ParkFactory) {

	$scope.allParks = [];

	let getAllParks = () => {
	 	UserFactory.getAllParks().then((results) => {
	 		$scope.allParks = results;
	 	}).catch((error) => {
	 		console.log("error getting list of all parks", error);
	 	});
	};

	getAllParks();



    
});
