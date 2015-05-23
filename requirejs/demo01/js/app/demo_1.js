define(["require","jquery","ejs"],function(require,_$,ejs){
	//ejs文件的url
	var uAtep= require.toUrl("../ejs/a.html");
	var uBtep= require.toUrl("../ejs/b.html");
	var uCtep= require.toUrl("../ejs/c.html");
	
	//ejs对象
	var ejsA=new EJS({url:uAtep});
	var ejsB=new EJS({url:uBtep});
	var ejsC=new EJS({url:uCtep});
	
	//ejs渲染
	$("#checkbox").html(ejsA.render());
	$("#radio").html(ejsB.render());
	$("#select").html(ejsC.render());
})