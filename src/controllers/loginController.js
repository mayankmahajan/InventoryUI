

app.controller('loginController', ['$scope','$location','DummyDataService', function($scope,$location,DummyDataService)
{
	

	 $scope.login = function (username,password) {
    	// use location to change view instead in $window 
    	$location.path('/startScreen')
        return DummyDataService.login(username,password);
    };

}]);
