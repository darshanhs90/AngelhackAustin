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

    /*$("div.star-rating > s, div.star-rating-rtl > s").on("click", function(e) {
        var numStars = $(e.target).parentsUntil("div").length+1;
        alert(numStars + (numStars == 1 ? " star" : " stars!"));
    });*/
});