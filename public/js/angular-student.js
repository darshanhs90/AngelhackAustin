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

	$scope.uploadResume=function(){
		$('#bnResume').toggleClass('active');

		setTimeout(function(){ $('#bnResume').toggleClass('active'); }, 3000);
	}
	$scope.submitDetails=function(){
		alertify.success('submitted succesfully');
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

}

$scope.users=[];
$scope.users.push({'id':'0','name':'Darshan0','university':'UT Dallas0','rating':'4','reviews':'fdfghjjkkl0','img':'images/darshan.jpg'})
$scope.users.push({'id':'1','name':'Darshan1','university':'UT Dallas1','rating':'3','reviews':'fdfghjjkkl1','img':'images/newone.jpg'})
$scope.users.push({'id':'2','name':'Darshan2','university':'UT Dallas2','rating':'5','reviews':'fdfghjjkkl2','img':'images/sreesha.jpg'})
$scope.users.push({'id':'3','name':'Darshan3','university':'UT Dallas3','rating':'2','reviews':'fdfghjjkkl3','img':'images/newone2.jpg'})
$scope.users.push({'id':'4','name':'Darshan4','university':'UT Dallas4','rating':'5','reviews':'fdfghjjkkl4','img':'images/shivu.jpg'})
$scope.users.push({'id':'5','name':'Darshan5','university':'UT Dallas5','rating':'4','reviews':'fdfghjjkkl5','img':'images/bhargavi.jpg'})



$scope.openModal=function($val)
{   
	$scope.avg='';
	$scope.user=$scope.users[$val];
	$("#btnmodal").click();
}
$scope.getAvgReviewScore=function($val){
		//make sentiment analysis of review
		$scope.avg=$val;
	}

	/*$("div.star-rating > s, div.star-rating-rtl > s").on("click", function(e) {
		var numStars = $(e.target).parentsUntil("div").length+1;
		alert(numStars + (numStars == 1 ? " star" : " stars!"));
	});*/
});