/**
 * 旋转木马js插件
 */
;
(function($) {
	var Carousel = function(poster) {
		var self = this;
		/*
		 * 保存旋转木马控件
		 */
		this.poster = poster; //海报对象
		this.posterItemMain = poster.find("ul.poster-list");
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.nextBtn = poster.find("div.poster-next-btn");
		this.posterItems = poster.find("li.poster-item");
		//让items为奇数个，方便后续操作
		if (this.posterItems % 2 == 0) {
			this.posterItemMain.append(this.posterItems.eq(0).clone());
			//			this.posterItems=this.posterItemMain.find("li.poster-item");
			this.posterItems = this.posterItemMain.children();
		}


		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();

		this.rotateFlag = true;
		//默认配置参数
		this.setting = {
			"width": 1000, //幻灯片的宽度
			"height": 270, //幻灯片的高度
			"posterWidth": 640, //幻灯片第一帧的宽度
			"posterHeight": 270, //幻灯片第一帧的高度
			"scale": 0.9, //记录显示比例关系
			"speed": 500,
			"autoPlay": false,
			"delay": 5000,
			"verticalAlign": "middle" //top bottom
		};

		//获取用户参数
		$.extend(this.setting, this.getSetting());

		//设置控件参数
		this.setSettingValue();
		//设置其他帧
		this.setPosterPos();

	};


	/**
	 * 在原型上扩展方法
	 */
	Carousel.prototype = {
		//设置基本控件样式
		setSettingValue: function() {
			this.poster.css({
				width: this.setting.width,
				height: this.setting.height
			});
			this.posterItemMain.css({
				width: this.setting.width,
				height: this.setting.height
			});
			//计算上下切换按钮的宽度
			var w = (this.setting.width - this.setting.posterWidth) / 2;
			//设置切换按钮的宽高，层级关系
			this.nextBtn.css({
				width: w,
				height: this.setting.height,
				zIndex: Math.ceil(this.posterItems.size() / 2)
			});
			this.prevBtn.css({
				width: w,
				height: this.setting.height,
				zIndex: Math.ceil(this.posterItems.size() / 2)
			});

			this.posterFirstItem.css({
				width: this.setting.posterWidth,
				height: this.setting.posterHeight,
				left: w,
				top: 0,
				zIndex: Math.floor(this.posterItems.size() / 2)
			});
		},
		//设置剩余的帧的位置关系
		setPosterPos: function() {
			var self = this;
			var sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size() / 2,
				rightSlice = sliceItems.slice(0, sliceSize),
				level = Math.floor(this.posterItems.size() / 2),
				leftSlice = sliceItems.slice(sliceSize);

			//设置右边帧的位置关系和宽度高度top
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width - this.setting.posterWidth) / 2) / level;

			var firstLeft = (this.setting.width - this.setting.posterWidth) / 2;
			var fixOffsetLeft = firstLeft + rw;
			//设置左边位置关系
			rightSlice.each(function(i) {
				level--;
				rw = rw * self.setting.scale;
				rh = rh * self.setting.scale
				var j = i;
				$(this).css({
					zIndex: level,
					width: rw,
					height: rh,
					opacity: 1 / (++j),
					left: fixOffsetLeft + (++i) * gap - rw,
					top: self.setVerticalAlign(rh)
				});
			});
			//设置左边的位置关系
			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop = Math.floor(this.posterItems.size() / 2);
			leftSlice.each(function(i) {
				$(this).css({
					zIndex: i,
					width: lw,
					height: lh,
					opacity: 1 / oloop,
					left: i * gap,
					top: self.setVerticalAlign(lh)
				});
				lw = lw / self.setting.scale;
				lh = lh / self.setting.scale;
				oloop--;
			});
		},
		//设置垂直排列对齐
		setVerticalAlign: function(height) {
			var verticalType = this.setting.verticalAlign,
				top = 0;
			if (verticalType === "middle") {
				top = (this.setting.height - height) / 2;
			} else if (verticalType === "top") {
				top = 0;
			} else if (verticalType === "bottom") {
				top = this.setting.height - height;
			} else {
				top = (this.setting.height - height) / 2;
			};
			return top;
		},
		//获取人工配置参数
		getSetting: function() {
			var setting = this.poster.attr("data-setting")
			if (setting && !setting == "") {
				try {
					return $.parseJSON(setting);
				} catch (e) {
					return {}
				}
			} else {
				return {};
			}
		}
	};
	/**
	 * 初始化多个图片海报
	 * @param {Object} posters
	 */
	Carousel.init = function(posters) {
		var _this_ = this;
		posters.each(function() {
			new _this_($(this));
		})
	};
	window["Carousel"] = Carousel;
})(jQuery);