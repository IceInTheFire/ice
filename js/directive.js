/**
 * Created by mianhua on 2016-10-30.
 */
//todoApp
(function(angular){
    var app=angular.module("myApp.directive",[]);
    app.directive("todoFocus",function(){
        return {
            link:function(scope,ele,attr){
                //���һ��˫���¼�
                ele.on("dblclick",function(){
                    angular.element(this).find("input").eq(1)[0].focus();
                    //console.log(angular.element(this).find('input').eq(1)[0]);
                })

            }
        }
    })
})(angular)