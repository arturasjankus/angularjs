angular.module('person', ['ngRoute', 'firebase'])
     
.value('fbURL', 'https://vivid-fire-6930.firebaseio.com/')
     
.factory('Persons', function($firebase, fbURL) {
    return $firebase(new Firebase(fbURL));
})
     
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller:'ListCtrl',
            templateUrl:'list.html'
        })
        .when('/edit/:personId', {
            controller:'EditCtrl',
            templateUrl:'detail.html'
        })
        .when('/person/:personId', {
            controller:'LookupCtrl',
            templateUrl:'lookup.html'
        })
        .when('/new', {
            controller:'CreateCtrl',
            templateUrl:'detail.html'
        })
        .otherwise({
            redirectTo:'/'
        });
})
     
.controller('LookupCtrl', function($scope, Persons, $firebase, $routeParams, fbURL) {
    var personUrl = fbURL + $routeParams.personId;
    $scope.person = $firebase(new Firebase(personUrl));
})

.controller('ListCtrl', function($scope, Persons) {
    $scope.persons = Persons;
})
     
.controller('CreateCtrl', function($scope, $location, $timeout, Persons) {
    $scope.save = function() {
        Persons.$add($scope.person, function() {
            $timeout(function() { $location.path('/'); });
        });
    };
})
     
.controller('EditCtrl', function($scope, $location, $routeParams, $firebase, fbURL) {
        var personUrl = fbURL + $routeParams.personId;
        $scope.person = $firebase(new Firebase(personUrl));
     
        $scope.destroy = function() {
            $scope.person.$remove();
            $location.path('/');
        };
     
        $scope.save = function() {
            $scope.person.$save();
            $location.path('/');
        };
});