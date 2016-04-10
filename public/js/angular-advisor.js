var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
	$scope.resume=false;
	$scope.form=false;
	$scope.vidcam=false;
	$scope.ratingText="Get Your Rating";
	$scope.showVidCam=function(){
		$scope.vidcam=true;
	}


	$scope.showResume=function($val)
	{
		if($val==0)
			$scope.resume=true;
		else
			$scope.form=true;
	}    

	$scope.uploadResume=function(){
		$('#bnResume').toggleClass('active');
		setTimeout(function(){ $('#bnResume').toggleClass('active'); }, 3000);
	}
	$scope.submitDetails=function(){
		alertify.success('submitted succesfully');
	}
	$scope.rating=0;
	$scope.getClass=function($val)
	{
		switch($val){
			case '0':return $scope.rating>0?"rated":"";break;
			case '1':return $scope.rating>1?'rated':'';break;
			case '2':return $scope.rating>2?'rated':'';break;
			case '3':return $scope.rating>3?'rated':'';break;
			case '4':return $scope.rating>4?'rated':'';break;
			default:break;

		}
	}
	$(document).on('mouseenter', '.divbutton', function () {
		$(this).find(":button").show();
		$(this).find("div").show();
	}).on('mouseleave', '.divbutton', function () {
		$(this).find(":button").hide();
		$(this).find("div").hide();
	});
	$scope.fppRes='';
	$scope.take_snapshot = function() {
			// take snapshot and get image data
			Webcam.snap(function() {
				// display results in page
				<!-- document.getElementById('results').innerHTML =  -->
				<!-- '<h2>Here is your image:</h2>' +  -->
				<!-- '<canvas src="'+data_uri+'"/>'; -->
			}, myCanvas);
			var canvas = document.getElementById("myCanvas");
			// draw to canvas...
			canvas.toBlob(function(blob) {
				saveAs(blob, "test.png");
			});


		}
		$scope.confidence=0;
		$scope.computeRating=function(){
			$http.get('http://localhost:1337/facedetectCheck').success(function(res){
				$scope.fppRes=res;
				console.log(res);
				if(res.face.length>0){
					$http.get('http://localhost:1337/fppCheck').success(function(res){
						console.log(res);
						$scope.confidence=res.face[0].attribute.smiling.value;
						$scope.confidence=Math.ceil($scope.confidence)%5;
						$scope.rating=$scope.confidence;
						console.log($scope.confidence);
						$scope.ratingText="Your Rating is ";
						$scope.vidcam=false;
					});
				}
				else{
					alertify.error('Zero faces detected in the video');
				}
			});
		}


	/*$("div.star-rating > s, div.star-rating-rtl > s").on("click", function(e) {
		var numStars = $(e.target).parentsUntil("div").length+1;
		alert(numStars + (numStars == 1 ? " star" : " stars!"));
	});*/
});