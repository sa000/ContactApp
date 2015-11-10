var myApp = angular.module('myApp', []);


myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.semester= ["Spring","Summer","Fall"];
    $scope.semesterIndex=0;

    console.log("Hello World from controller");



    $http.get('/overallCount').success(function(response) {
          console.log("I got the count of overall review count of 5");
          $scope.overall5 = response.FiveStarCount;
          $scope.overall4 = response.FourStarCount;
          $scope.overall3 = response.ThreeStarCount;
          console.log("I think 3 star responses work"+response.ThreeStarCount)
          $scope.overall2 = response.TwoStarCount;
          $scope.overall1 = response.OneStarCount;
          $scope.overallTotal=$scope.overall1+2*$scope.overall2+3*$scope.overall3+4*$scope.overall4+5*$scope.overall5;
                });






        this.addReview = function (reviews) {
            this.review.createdOn = Date.now();
            this.reviews.push(this.review);
            this.review = {};
          };

$http.get('/contactlist').success(function($scope, response) {
  console.log("I got the DATA")
  $scope.contactlist = response;
  $scope.contact = ""; // clears out input box
});
// insert review count, controller talks to server through url (routes, name does not matter jsut describe what it does
// if success contact server comes back here
$http.get('/contactlistcount').success(function(response) {
// should have console.log to make sure sent
console.log("THIS SHIZ WORKS AND HAS BEEN RETREIVED");
// my parameter is response so since received that to scope to send back through reviewCount within brackets under ng-controller
$scope.reviewCount = response;
console.log("I think responses work"+response)
// !!!!!!! DOES NOT REFRESH LIVE FIX LATER
});

$scope.filter = function (crit1) {
	console.log("The filtered button has been pressed");
  console.log("The  filtered number is "+crit1)
  $http.get('/filter/'+crit1).success(function(response){
    console.log("received the filtered reviews"+response)
    $scope.contactlist=response;
 });

};
$scope.incrementUpvotes = function(contact) {
  contact.upvotes += 1;
};

$scope.addContact = function () {
  $scope.contact["semester"]=  $scope.semester[$scope.contact["semesterIndex"]]
  $scope.contact["year"]=parseInt($scope.contact["year"])
  $scope.contact["upvotes"]=parseInt(0);
	console.log("Your review is"+$scope.contact);
	$http.post('contactlist', $scope.contact).success(function(response) {
		console.log("response:"+response);
 	});
};

$scope.remove = function(id) {
	console.log(id);
	$http.delete('/contactlist/' + id).success(function(response) {
 	});
};

$scope.edit = function(id) {
	console.log(id);
	$http.get('/contactlist/' + id).success(function(response) {
		$scope.contact = response;
	});
};

$scope.update = function() {
	console.log($scope.contact._id);
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
 	})
};

$scope.deselect = function() {
	$scope.contact = "";
}

}]);
