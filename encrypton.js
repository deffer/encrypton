function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

var app = angular.module("myEncrApp", []); 

app.controller("myEncrCtrl", function($scope) {
    $scope.message = "";
	$scope.lines = [];
    $scope.start  = function() {
		var nextRandom = new BigInteger(1536,1,new SecureRandom());
		$scope.lines.push({message:
			linebrk(nextRandom.toString(16), 64)
			//linebrk(hex2b64(nextRandom.toString(16)), 64)
			}
		);
	};
    $scope.clear = function() {$scope.message = "";};
    $scope.save  = function() {alert("Note Saved");};
}); 