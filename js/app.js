(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var app=angular.module("myApp",["myApp.directive","myApp.service"]);
	app.controller("myController",function($scope,$filter,mystorage){
		$scope.todo="";
		//����Դ
		$scope.todoList=mystorage.get();

		//���
		$scope.add=function(){
			if($scope.todo.length>0){
				$scope.todoList.push({text:$scope.todo,completed:false});
				$scope.todo="";
				mystorage.save();
			}
		}
		//ɾ��
		$scope.del=function(item){
			var index=$scope.todoList.indexOf(item);
			$scope.todoList.splice(index,1);
			mystorage.save();
		}
		//�޸�
		// ��˫������ʾ�޸Ŀ�
		// ���޸ģ�����������angular��˫�����ݰ󶨵�����
		// ʧȥ���㣬�����޸Ŀ�
		$scope.todoitem="";
		// 1˫��
		$scope.dblclick=function(item){
			$scope.todoitem=item;
		}
		// 2ʧȥ����
		$scope.lose=function(){
			$scope.todoitem="";
			mystorage.save();
		}



		$scope.checkAll=false;
		$scope.todoCount=0;    //���ڼ�¼����ʾ�����½�����,��ʣ�¼���û��
		//��ߵ�checked
		$scope.$watch('todoList',function(newVal){
			//������������
			//��Ҫ���˵�����
			//���˵�����
			$scope.todoCount=$filter("filter")($scope.todoList,{completed:false}).length;
			$scope.isshowclear=$filter("filter")($scope.todoList,{completed:true}).length>0?true:false;
			$scope.checkAll=!$scope.todoCount;
			$scope.todoLength=$scope.todoList.length;
		},true);
		//ȫѡ
		$scope.checkedAll=function(){
			angular.forEach($scope.todoList,function(value,key){
				value.completed=$scope.checkAll;
			})
		}

		//�л�״̬
		$scope.status={};
		$scope.statusclass="all";
		$scope.all=function(){
			$scope.status={};
			$scope.statusclass="all";
		}
		$scope.active=function(){
			$scope.status={completed:false};
			$scope.statusclass="active";
		}
		$scope.completed=function(){
			$scope.status={completed:true};
			$scope.statusclass="completed";
		}

		//�����ѡ���
		$scope.delselected=function(){
			//$scope.todoList=$filter("filter")($scope.todoList,{completed:false});//���Ƽ����ֻ�ı�todoList�ڴ�ѵ�ַ�ķ���
			//ջ�Ǳ���������λ�ã����Ǳ�������ֵ����λ��

			var tempList=$filter("filter")($scope.todoList,{completed:false});
			$scope.todoList.splice(0,$scope.todoList.length);//����ɾ�����ݲ����޸����õĵ�ַ
			angular.merge($scope.todoList,tempList);
			mystorage.save();
		}


	});
})(window);
