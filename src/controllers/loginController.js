

app.controller('loginController', ['$scope','$location','DummyDataService', function($scope,$location,DummyDataService)
{
	

	 $scope.login = function (username,password) {
    	// use location to change view instead in $window 
    	$location.path('/startScreen')
        return DummyDataService.login(username,password);
    };

}]);


app.controller('navbarController', ['$scope', function($scope)
{
	
	 $scope.appName = 'TMOCare';
	 $scope.userName = 'Welcome Jolly';
	
}]);

app.controller('footerController', ['$scope','DummyDataService', function($scope,DummyDataService)
{
	 // set default
	 $scope.timeZone = DummyDataService.getTimeZone();

	 function init()
	 {
        // TimeRangeService.getZoneInfo(timezonResponseHandler);
	 };

	 init();

	 function timezonResponseHandler(response)
	 {
	 	DummyDataService.setTimeZone(response);
	 	$scope.timeZone = DummyDataService.getTimeZone();
	 };



     
}]);

