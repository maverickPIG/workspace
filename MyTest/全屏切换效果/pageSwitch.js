(function($) {
	var defaults = {
		'container': '#container', //容器
		'sections': '.section', //自容器
		'easing': 'ease', //特效方式，ease-in,ease-out,linear
		'duration': 1000, //每次动画执行的时间
		'loop': true, //是否循环
		'keyboard': true, //是否支持键盘
		'direction': 'vertical', //滑动方向，horizontal,vertical
		'onpageSwithc': function(pagenum) {}
	}
	var win = $(window),
		container, sections;

	var opts = {},
		canScroll = true;

	var iIndex = 0;

	var arrElement = [];

	var SP = $.fn.pageSwitch = function(options) {
		var opts = $.extend({}, defaults, options || {});

		return this.each(function() {

		})
	}

	//滚动向上滑动事件
	SP.moveSectionUp = function() {};

	//滚动向下滑动事件
	SP.moveSectionDown = function() {};
	
	/**
	 * 私有方法
	 */
	//页面滚动事件
	function scrollPage(element){}
	
	//重写鼠标滑动事件
	$(document).on("mousewheel DOMMouseScroll",MouseWheelHandler);
	
	function MouseWheelHandler(e){
		e.preventDefault();
		var value=e.originalEvent.wheelDelta||-e.originalEvent.detail;
		var delta =Math.max(-1,Math.min(1,value));
		if(canScroll){
			if(delta<0){
				SP.moveSectionDown();
			}esle{
				SP.moveSectionUp();
			}
		}
	}
	
	//横向布局初始化
	function initLayout(){}
	
	//初始化分页
	function initPageination(){}
	
	//分页事件
	function pageinationHandler(){}
	
	//是否支持css的某个属性
	function isSuportCss(property){}
	
	//渲染效果
	function initEffects(dest,element){}
	
	//窗口Resize
	var resizeId;
	win.resiz(function(){
		
	})
	
	function reBuild(){}
	
	//绑定键盘事件
	function keyDown(){}
	
})(jQuery)