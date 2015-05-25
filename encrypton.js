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
var pStr = "";
var rnd1Str =  "d61c97da3b0db88f726511e346bce8ce302ba363ca38caef4d68bf72efe7dad7b8102fa38190ffb42148617421fadaaa02a43d1394638cf61f214af91cd57579d3aefd4a728fb0423c2b7d31f7672816993f95ca5490316c9a9c8dfc4bccb5d2fcc97a109e57d7005457a8f4a4ddda460b8ec4a7ce0ccc778c4806a75392b838a6b4ac3e675665fe20859399749713ace1ce74e8f8ce714ec8b10c76d68a22662e4193f11e70061ef6103b6050a73dab2aed811cf33e51fd04a38f5b8b6ee075"
var rnd2Str = "b59944da36a9ec70ac426cbcefb718a41d9a686ee5088ab0e8422bf58a4d9da3aae211ec28866babda6ff13a6c2ef84928ea464b956d6e09548ee014ba9c0e8dd3ba5a8a48bf5f020fa58af897a2cfa2888c5a1ebca481935e14d4528a6fbb08bf24e985edf4845adfb307301045790f1d1be0c1326b692b453fa94c1033e2e881e2538fa729590fbe72bfcfe7364c4ca9e3de403e597fce6d89d0a7890eec5d32d854795f0ca9a3bd56c5395affa5791544c6f81026e08d7b668f4548d7972f"

app.controller("myEncrCtrl", function($scope, $timeout) {
    $scope.message = "";
	$scope.lines = [];
    $scope.start  = function() {
		var a2, a3, g2a, str;
		
		var pHex = b64tohex(pStr);
		var p = new BigInteger(pHex, 16);
		var g1 = new BigInteger("02", 16);
		$scope.lines.push({message: "Given p = 1536 bits prime and g1 = "+g1.toString(10), descr: pHex});
		$scope.lines.push({message: "Alice picks random exponent a2...", descr: ""});
		$timeout(function(){
			console.log("a2");
			a2 = new BigInteger(1536,1,new SecureRandom());
			var str = a2.toString(16);
			$scope.lines.push({message: "Alice a2 = "+ str.substring(0,10)+"...", descr: linebrk(str, 64)});
			$scope.lines.push({message: "Alice picks random exponent a3...", descr: ""});
		}, 10).then(function(){
			console.log("a3");
			a3 = new BigInteger(1536,1,new SecureRandom());
			str = a3.toString(16);
			$scope.lines.push({message: "Alice a3 = "+ str.substring(0,10)+"...", descr: linebrk(str, 64)});
			$scope.lines.push({message: "Alice computes g2a = g1 ^ a2 MOD p", descr: ""});
		}).then(function(){
			console.log("g2a");
			/*g2a = g1.modPow(a2, p)
			str = g2a.toString(16);
			$scope.lines.push({message: "Alice g2a = "+ str.substring(0,10)+"...", descr: linebrk(str, 64)});*/
			//$scope.lines.push({message: linebrk(hex2b64(nextRandom.toString(16)), 64)});
		});
	};
	
    $scope.altstart  = function() {
		var a2, a3, g2a, str;
		
		var pHex = b64tohex(pStr);
		var p = new BigInteger(pHex, 16);
		var g1 = new BigInteger("02", 16);
		$scope.lines.push({message: "Given p = 1536 bits prime and g1 = "+g1.toString(10), descr: pHex});
		$scope.lines.push({message: "Alice picks random exponent a2...", descr: ""});
		$timeout(function(){
			console.log("a2");
			a2 = new BigInteger(1536,1,new SecureRandom());
			var str = a2.toString(16);
			$scope.lines.push({message: "Alice a2 = "+ str.substring(0,10)+"...", descr: linebrk(str, 64)});
			$scope.lines.push({message: "Alice picks random exponent a3...", descr: ""});
			$timeout(function(){
				console.log("a3");
				a3 = new BigInteger(1536,1,new SecureRandom());
				str = a3.toString(16);
				$scope.lines.push({message: "Alice a3 = "+ str.substring(0,10)+"...", descr: linebrk(str, 64)});
				$scope.lines.push({message: "Alice computes g2a = g1 ^ a2 MOD p", descr: ""});
				$timeout(function(){
					console.log("g2a");
					g2a = g1.modPow(5, 6);
					/*g2a = g1.modPow(a2, p);
					str = g2a.toString(16);
					$scope.lines.push({message: "Alice g2a = "+ str.substring(0,10)+"...", descr: linebrk(str, 64)});*/
					//$scope.lines.push({message: linebrk(hex2b64(nextRandom.toString(16)), 64)});				
				}, 10);
			}, 10);
		}, 10);
	};	
	
    $scope.clear = function() {
		var bi = new BigInteger(modpStr, 16);
		$scope.lines.push({message:linebrk(bi.toString(16), 64)});
	};
    $scope.save  = function() {alert("Note Saved");};
}); 