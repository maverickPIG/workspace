//测试函数
function test(){
	alert(2);
	return "me test";
	
}

//aop before
Function.prototype.before=function (fn){
	var __self=this;
	return function(){
		//this指向了调用的函数
		
		if(fn.apply(__self,arguments)==false){
			return false;
		}
		
		return __self.apply(__self,arguments);
	}
	
}
//aop after
Function.prototype.after=function(fn){
	//after先执行本身this，再执行回调
	var __self=this;
	return function(){
		var result=__self.apply(__self,arguments);
		fn.apply(this,arguments);
		if(result==false){
			return false;
		}
		return result;
	}
}


test.after(function(){
	alert(3);
}).before(function(){
	alert(1);
})();
