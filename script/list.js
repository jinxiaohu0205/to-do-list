angular.module("myapp",[])
    .controller("ctrl",["$scope","$filter",function($scope,$filter){
        $scope.data=localStorage.data?JSON.parse(localStorage.data):[];
        $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
        // $scope.data=[];

        //当前选择的事项
        $scope.currentIndex=0;
        $scope.currentCon=$scope.data[$scope.cruuentIndex];

        //显示完成的条列
        $scope.isshow=true;

        // 监控事件

        $scope.search="";
        $scope.$watch("search",function(){
            var arr=$filter("filter")($scope.data,{title:$scope.search});
            $scope.currentIndex=0;
            $scope.currentCon=arr[$scope.currentIndex]
        })

        //处理的函数
        $scope.add=function(){
            var obj={};
            obj.id=getid($scope.data);
            obj.son=[];
            obj.title="新建事项"+obj.id;
            $scope.data.push(obj);

            //当前显示的那个事项的名字（在右边显示）
            $scope.currentIndex=getindex($scope.data,obj.id);
            $scope.currentCon=$scope.data[$scope.currentIndex];
            localStorage.data=JSON.stringify($scope.data);
        }

        //删除事项
        $scope.del=function(id){
            $scope.data.forEach(function(val,index){
                if(id==val.id){
                    $scope.data.splice(index,1);
                    var index=getindex($scope.data,id);
                    if(id==$scope.data.length-1){
                        $scope.currentIndex=index-1;
                        $scope.currentCon=$scope.data[$scope.currentIndex];
                    }else{
                        $scope.currentIndex=$scope.data.length-1;
                        $scope.currentCon=$scope.data[$scope.currentIndex];
                    }
                }
            })
            localStorage.data=JSON.stringify($scope.data);
        }

        //事项获取焦点时候的事件
        $scope.focu=function(id){
            console.log(id);
            var index=getindex($scope.data,id);
            $scope.currentIndex=index;
            console.log($scope.currentIndex);
            $scope.currentCon=$scope.data[$scope.currentIndex];
        }

        //事项失去焦点时候发生的时间
        $scope.blur=function(id){
            console.log(10);
            localStorage.data=JSON.stringify($scope.data);
        }

        //添加条列
        $scope.addList=function(id){
            var obj={};
            obj.id=getid($scope.currentCon.son);
            obj.title="新建列表"+obj.id;
            $scope.currentCon.son.push(obj);
            localStorage.data=JSON.stringify($scope.data);
        }

        //删除条列
        $scope.delList=function(id){
            var index=getindex($scope.currentCon.son,id);
            $scope.currentCon.son.splice(index,1);
            localStorage.data=JSON.stringify($scope.data);
        }

        // 完成的列表
        $scope.dfun=function(id){
            var index=getindex($scope.currentCon.son,id);
            // 删除
            var delobj=$scope.currentCon.son.splice(index,1);
            //
            delobj[0].id=getid($scope.done);
            $scope.done.push(delobj[0]);
            localStorage.done=JSON.stringify($scope.done);
            localStorage.data=JSON.stringify($scope.data);
        }
        $scope.showd=function(){
            $scope.isshow =false;
        }
        $scope.showcon=function(){
            $scope.isshow=true;
        }

        // 删除done里边的
        $scope.deldone=function(id){
            var index=getindex($scope.done,id);
            $scope.done.splice(index,1);
            localStorage.done=JSON.stringify($scope.done);
        }

        //获取最大的id
        function getid(arr){
            if(arr.length==0){
                return 1;
            }else{
                var min=arr[0].id;
                for(var i=0;i<arr.length;i++){
                    if(min<arr[i].id){
                        min=arr[i].id;
                    }
                }
                return min+1;
            }
        }

        //获取当前的index
        function getindex(arr,id){
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    return i;
                }
            }
        }
}])