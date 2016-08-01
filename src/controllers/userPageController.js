

app.controller('userPageController', ['$scope','$location','$http','$localStorage', function($scope,$location,$http,$localStorage)
{
	
	$scope.validateUserURL = 'sqllite/validateUser.php?'
		
	$scope.loginRequest = function(){
		// clearing LocalStorage
		$scope.clearLocalStorage();
//		Save Request to Python
//		qp = 'api=insert&';
		qp = 'api=validate_user&';
		for (var i = 0; i < arguments.length; i=i+2) {
			if (arguments[i+1] == undefined)
				{
				arguments[i+1] = ''
				}
				
			qp = qp.concat(arguments[i]+"="+arguments[i+1]+"&");
		}
		// $scope.httpRequest($scope.validateUserURL.concat(qp));
		$http.get($scope.validateUserURL.concat(qp)).then(function(response){
			var status = false;
						if (response.data.hasOwnProperty('0')){
							if (response.data[0].hasOwnProperty('group_name')){
								$scope.updateUser(response.data[0]['user_name'],response.data[0]['group_name']);
								status = true;
							}
							alert (response.data);
							// status = false;
						}
						else{
							alert (response.data);
							status =  false;
						}

						if (status)
						{
							if ($localStorage['role'] == "admin"){
								$location.path('/hardwareInventoryPage')	
							}
							else if ($localStorage['role'] == "normal") {
								$location.path('/addSetupPage')
							} 
							else {
								alert ("in else")
							}
							
						}
					else{
						$location.path('/index.html')
					} 
			
		});
		
	}
	 
	$scope.updateUser = function(username,role)
		{
			$localStorage['user'] = username;
			$localStorage['role'] = role;
		}
	$scope.clearLocalStorage = function()
		{
			$localStorage['user'] = '';
			$localStorage['role'] = '';
		}

	$scope.login = function (username,username1,password,password1) {
		$scope.username = username1;
    	// use location to change view instead in $window 
    	$scope.loginRequest(username,username1,password,password1);
		
    };

}]);
