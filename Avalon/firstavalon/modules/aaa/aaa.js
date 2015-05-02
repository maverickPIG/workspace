define(['avalon','text!./aaa.html'],function(avalon,aaa){
	avalon.templateCache.aaa=aaa;
	avalon.define({
		$id:"aaa",
		username:"喻庆捷"
	})
	avalon.vmodels.root.page="aaa"
})