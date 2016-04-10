var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
	$scope.resume=false;
	$scope.form=false;
	$scope.showResume=function($val)
	{
		if($val==0)
			$scope.resume=true;
		else
			$scope.form=true;
	}    
	$scope.resumeContent='';
	$scope.valShow=1;
	$scope.parsedAddress='',$scope.parsedExperience='',$scope.parsedMail='',$scope.parsedName='',$scope.parsedPhone='';
	$scope.parsedGre='',$scope.parsedToefl='';
	$scope.uploadResume=function(){
		$('#bnResume').toggleClass('active');
		$scope.resumeContent='';
		$scope.conceptsExtracted='';
		$scope.entitiesExtracted='';
		setTimeout(function(){ 
			$('#bnResume').toggleClass('active'); 
			$scope.valShow=2;
			$http.get('http://localhost:1337/extracttext').success(function(res){
				$scope.resumeContent=(res.document[0].content);
				console.log($scope.resumeContent);
				$http.get('http://localhost:1337/conceptExtraction').success(function(res){
					console.log(res);
					$scope.conceptsExtracted=(res);
					$http.get('http://localhost:1337/extractentities').success(function(res){
						console.log(res);
						$scope.entitiesExtracted=(res.entities);
						$("#btnmodal").click();
						for (var i = 0; i <$scope.entitiesExtracted.length; i++) {
							if($scope.entitiesExtracted[i].type=='companies_eng' && $scope.parsedExperience==''){
								$scope.parsedExperience=$scope.entitiesExtracted[i].normalized_text;
							}else if($scope.entitiesExtracted[i].type=='places_eng' && $scope.parsedAddress==''){
								$scope.parsedAddress=$scope.entitiesExtracted[i].normalized_text;
							}else if($scope.entitiesExtracted[i].type=='person_fullname_eng' && $scope.parsedName==''){
								$scope.parsedName=$scope.entitiesExtracted[i].normalized_text;
							}else if($scope.entitiesExtracted[i].type=='internet_email' && $scope.parsedMail==''){
								$scope.parsedMail=$scope.entitiesExtracted[i].normalized_text;
							}else if($scope.entitiesExtracted[i].type=='number_phone_us' && $scope.parsedPhone==''){
								$scope.parsedPhone=$scope.entitiesExtracted[i].normalized_text;
							}
						}	

					})
				})
					$scope.tempText=$scope.resumeContent.split("GRE Score: ");
					$scope.tempText1=$scope.resumeContent.split("TOEFL Score: ");
					$scope.parsedGre=($scope.tempText[1].substring(0,4));
					$scope.parsedToefl=($scope.tempText1[1].substring(0,4));
			})


		}, 3000);
	}
	$scope.submitDetails=function(){
		alertify.success('Saved succesfully');
	}
	$scope.rating=3;
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


	$scope.collegenames=["Alabama State University",
	"Boston University",
	"California Institue of Technology",
	"Dartmouth University",
	"SUNY at Binghamton",
	"The University of Texas at Arlington",
	"The University of Texas at Austin",
	"The University of Texas at Dallas",
	"The University of Texas at San Antonio",
	"University of British Columbia",
	"University of California-Berkeley",
	"University of Colorado Boulder",
	"University of Maryland-College Park",
	"University of Minnesota-Twin Cities",
	"University of North Florida",
	"University of Waterloo",
	"Virginia Polytechnic Institute and State University",
	"Washington State University",
	"Zane State College"];

	$(document).on('mouseenter', '.divbutton', function () {
		$(this).find(":button").show();
		$(this).find("div").show();
	}).on('mouseleave', '.divbutton', function () {
		$(this).find(":button").hide();
		$(this).find("div").hide();
	});

	$scope.getList=function(){
		

		window.location.href="student-index.html#work";

		
	}

	$scope.users=[];
	$scope.users.push({'id':'0','name':'Sreesha N','university':'UT Dallas','rating':'4','reviews':'I am really annoyed with your poor performance recently','img':'images/darshan.jpg'})
	$scope.users.push({'id':'1','name':'Darshan HS','university':'UT Dallas','rating':'3','reviews':'Hey, good job with that thing you did recently','img':'images/newone.jpg'})
	$scope.users.push({'id':'2','name':'Bhargavi R','university':'UT Dallas','rating':'5','reviews':'I am really annoyed with your poor performance recently','img':'images/sreesha.jpg'})
	$scope.users.push({'id':'3','name':'Shivu G','university':'UT Dallas','rating':'2','reviews':'Hey, good job with that thing you did recently','img':'images/newone2.jpg'})
	$scope.users.push({'id':'4','name':'Ritu P','university':'UT Dallas','rating':'5','reviews':'I am really annoyed with your poor performance recently','img':'images/shivu.jpg'})
	$scope.users.push({'id':'5','name':'NoName','university':'UT Dallas','rating':'4','reviews':'Hey, good job with that thing you did recently','img':'images/bhargavi.jpg'})



	$scope.openModal=function($val)
	{   
		$scope.valShow=1;
		$scope.avg='';
		$scope.user=$scope.users[$val];
		$("#btnmodal").click();
	}
	$scope.getAvgReviewScore=function($val){
		$http.get('http://localhost:1337/analyzeSentimentalAnalysis?sentiment='+$scope.users[$val].reviews).success(function(res){
			$scope.avg=res.aggregate.score;
		});
	}

	$scope.makeVideoCall=function($val){
		$http.get('http://localhost:1337/sendPushBullet?name='+$scope.users[$val].name).success(function(res){
			alertify.success('Advisor Alerted');
			setTimeout(function(){
				window.location.href='https://opentokrtctestdemo.herokuapp.com/demo';
			},2000);
		});

	}
	/*$("div.star-rating > s, div.star-rating-rtl > s").on("click", function(e) {
		var numStars = $(e.target).parentsUntil("div").length+1;
		alert(numStars + (numStars == 1 ? " star" : " stars!"));
	});*/
});