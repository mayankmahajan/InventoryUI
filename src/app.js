
var app = angular.module('invApp', ['ngRoute']);
app.value('isOffline', true);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider,$sceDelegateProvider,$interpolateProvider) {
//	app.config('RestangularProvider','$routeProvider','$sceDelegateProvider',function (RestangularProvider,$routeProvider,$sceDelegateProvider) {
//	RestangularProvider.setBaseUrl('/api');
	
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
	
	$sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   'https://192.168.162.49:6443/**','https://192.168.162.49:6443/**'
   // Allow loading from our assets domain.  Notice the difference between * and **.
   ]);

    $routeProvider
        .when('/addSetupPage',
            {
                controller: 'addSetupPageController',
                templateUrl: 'views/addSetupPage.html'
            })
        .when('/hardwareInventoryPage',
            {
                controller: 'hardwareInventoryController',
                templateUrl: 'views/hardwareInventoryPage.html'
            })
        .otherwise({ redirectTo: '/hardwareInventoryPage' });
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
    
        

//app.config(["RestangularProvider",function(RestangularProvider){
//	RestangularProvider.setBaseUrl('/api');
//}]);

	
	
	

