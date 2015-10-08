var _$ = $;
/**
 * 构造函数
 * @param options
 * @constructor
 */
function Ad(options) {
	this.ad_data = null;
	defaults = _$.extend(defaults, options || {});
	adSlider.loadAd();
};

/**
 * 获取请求的广告数据,此处用于ajax请求
 * @returns {"id":25,"title":"","img":"1423813222179.jpg","msg":"","url":"/lobby"}
 */
Ad.prototype.getData = function() {
	return this.ad_data;
};
/**
 * 根据数据显示广告效果
 * @param callback
 */
Ad.prototype.show = function(callback) {
	if ($.isFunction(callback)) {
		callback.call(this, this.ad_data);
	}
};

//默认参数
var defaults = {
	auto: true, //是否自动播放
	delay: 5000, //自动播放间隔
	hideClickBar: true, //是否显示点击小按钮
	hideLrBar: true, //是否显示左右按钮
	ad_data: null, //广告数据
	width: '575px' //默认宽度(首页：575px、公会房：466px、百度两栏tf：490px)
};

/**
 * 图片轮播效果
 * @type {{}}
 */
var adSlider = {
	loadAd: function() {
		var that = this;
		if (!defaults.ad_data) return;
		if (defaults.ad_data.length > 0) {
			var sLi = "";
			var sA = "";
			for (var i = 0, l = defaults.ad_data.length; i < l; i++) {
				var img_path = defaults.ad_data[i].img;
				var _DOMwidth = (/^\/tf\//).test(location.pathname) ? "490px" : defaults.width;
				if ((/^\/tf\//).test(location.pathname)) {
					_$("div.F-adv div.carousel-diagram div.carousel-diagram-wrap").width("490px");
				}
				sLi += '<li style="width: ' + _DOMwidth + '"><a target="_blank" href="' + defaults.ad_data[i].url + '" title="' + defaults.ad_data[i].title + '"><img src="http://image.cache.xiu8.com/images/other/m/' + img_path + '" style="width:' + _DOMwidth + '"/></a></li>';
				sA += '<a href="javascript:;" class=" ' + (i == 0 ? 'cur' : '') + ' " rel="1"></a>';
			}
			//多渲染两层dom结构，实现无缝轮播
			if (defaults.ad_data.length > 1) {
				oUl.innerHTML = sLi + sLi;
			} else {
				oUl.innerHTML = sLi;
			}
			//大于两条创建点击按钮
			if (defaults.ad_data.length > 1 && defaults.hideClickBar) {
				//创建小按钮
				_$(".ad-points").html(sA);
			}
			aLi = oUl.children,
				aBtn = that.getByClass(document, "ad-points")[0].children,
				//算ul宽度
				oUl.style.width = oUl.children.length * oUl.children[0].offsetWidth + 'px';
			_width = oUl.offsetWidth / 2;
			that.addEvent();
		} else {
			//广告数据为空
		}
	},
	/**
	 * 添加监听事件
	 */
	addEvent: function() {
		var that = this;
		_$(".carousel-diagram").mouseenter(function() {
			if (defaults.hideLrBar && defaults.ad_data.length > 1) {
				_$(".ad-prev").css("display", "block");
				_$(".ad-next").css("display", "block");
			}
			clearInterval(_timer);
			_timer = null;
		});
		_$(".carousel-diagram").mouseleave(function() {
			_$(".ad-prev").css("display", "none");
			_$(".ad-next").css("display", "none");
			that.autoPlay();
		});
		if (defaults.hideLrBar) {
			_$(".ad-prev").click(function() {
				iNow--;
				that.tab();
			});
			_$(".ad-next").click(function() {
				iNow++;
				that.tab();
			});
		}
		//是否给‘点’添加事件
		if (defaults.hideClickBar) {
			for (var i = 0; i < aBtn.length; i++) {
				(function(index) {
					aBtn[i].onclick = function() {
						if ((iNow % aBtn.length == aBtn.length - 1 || iNow % aBtn.length == -1) && index == 0) {
							iNow++;
						}
						if (iNow % aBtn.length == 0 && index == aBtn.length - 1) {
							iNow--;
						}
						iNow = Math.floor(iNow / aBtn.length) * aBtn.length + index;
						that.tab();
					};
				})(i);
			}
		}
		that.autoPlay();
	},
	/**
	 * 自动播放
	 */
	autoPlay: function() {
		//是否自动播放
		if (!defaults.auto || defaults.ad_data.length <= 1) {
			return;
		}
		var that = this;
		clearInterval(_timer);
		_timer = setInterval(function() {
			iNow++;
			that.tab();
		}, defaults.delay);
	},
	/**
	 * 兼容获取class名称的元素
	 * @param oParent
	 * @param sClass
	 * @returns {*}
	 */
	getByClass: function(oParent, sClass) {
		if (oParent.getElementsByClassName) {
			return oParent.getElementsByClassName(sClass);
		} else {
			var arr = [];
			var aEle = oParent.getElementsByTagName('*');
			var reg = new RegExp('\\b' + sClass + '\\b');
			for (var i = 0; i < aEle.length; i++) {
				if (reg.test(aEle[i].className)) {
					arr.push(aEle[i]);
				}
			}
			return arr;
		}
	},
	/**
	 * 切换
	 */
	tab: function() {
		var that = this;
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].className = '';
		}
		if (iNow > 0) {
			aBtn[iNow % aBtn.length].className = 'cur';
		} else {
			aBtn[(iNow % aBtn.length + aBtn.length) % aBtn.length].className = 'cur';
		}
		that.startMove(oUl, -iNow * aLi[0].offsetWidth);
	},
	/**
	 * 移动引擎
	 * @param obj
	 * @param iTarget
	 */
	startMove: function(obj, iTarget) {
		clearInterval(obj.timer);
		var count = Math.floor(500 / 30);
		var start = _left;
		var dis = iTarget - start;
		var n = 0;
		obj.timer = setInterval(function() {
			n++;
			var a = 1 - n / count;
			_left = start + dis * (1 - a * a * a);
			if (_left < 0) {
				obj.style.left = _left % _width + 'px';
			} else {
				obj.style.left = (_left % _width - _width) % _width + 'px';
			}
			if (n == count) {
				clearInterval(obj.timer);
			}
		}, 30);
	}
};
//变量
var oFocusPic = adSlider.getByClass(document, "carousel-diagram-wrap")[0],
	oUl = oFocusPic.getElementsByTagName("ul")[0],
	aLi = null,
	aBtn = null,
	_width = 0,
	iNow = 0,
	_left = 0,
	_timer = null;

xiubaAd = function(options) {
	return new Ad(options);
}
var _data = {
	"adInfo": [{
		"id": 74,
		"img": "1425959935645.jpg",
		"msg": "",
		"title": "骑士印记",
		"url": "/act/knight"
	}, {
		"id": 76,
		"img": "1425960042843.jpg",
		"msg": "",
		"title": "土豪遇到新主播",
		"url": "/activity/tuhao"
	}]
};

$(function() {
	xiubaAd({
		width: "575px",
		ad_data: _data.adInfo
	});
})