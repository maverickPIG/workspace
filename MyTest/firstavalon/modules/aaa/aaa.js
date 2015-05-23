define(['avalon','text!./aaa.html'],function(avalon,aaa){
	avalon.templateCache.aaa=aaa;
	var obj = avalon.define({
		$id:"aaa",
		username:"喻庆捷",
	});
	window.test = function getUsername() {
		alert(obj.username);
		return obj.username;
	}
	avalon.vmodels.root.page="aaa"
})