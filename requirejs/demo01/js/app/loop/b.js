//问题
/*define(["a"],function(a){
	console.log("b==b loading") //undefined
	console.log("b==a "+a);
})*/


//解决办法一
define(function(require, exports, module) {
    //If "a" has used exports, then we have a real
    //object reference here. However, we cannot use
    //any of a's properties until after b returns a value.

    exports.foo = function () {
    	var a = require("a");
        return a.bar();
    };
});

/*//Inside b.js:
define(['a', 'exports'], function(a, exports) {
    //If "a" has used exports, then we have a real
    //object reference here. However, we cannot use
    //any of a's properties until after b returns a value.

    exports.foo = function () {
        return a.bar();
    };
});*/
