define(["b"],function(b){
	console.log("a== a loading");
	console.log("a== b " +b);
	b.foo();
	return {
		bar:function(){
			alert("bar");
		}
	}
})