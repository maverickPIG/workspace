require.config({
	baseUrl:"js",
	paths:{
		jquery:"lib/jquery-1.7.2",
		ejs:"lib/ejs-v1.0.1",
		demo_1:"app/demo_1"
	}
	
})
requirejs(["jquery","ejs","demo_1"],function(_$,ejs,demo_1){})