require.config({
	baseUrl:"js",
	paths:{
		a:"app/loop/a",
		b:"app/loop/b"
	}
})
require(["a","b"],function(a,b){
//	console.log(a);
//	console.log(b);
})