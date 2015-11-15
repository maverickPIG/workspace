;
(function($) {
	var LightBox = function() {
		var self = this;
		//创建遮罩和弹出框
		this.popupMask = $("<div id='G-lightbox-mask'></div>");
		this.popupWin = $("<div id='G-lightbox-popup'></div>");
		//保存body
		this.bodyNode = $(document.body);
		//渲染剩余的dom，并且插入到body
		this.renderDom();
	}

	LightBox.prototype = {
		renderDom: function() {
			var strDom =
				'<div class="lightbox-pic-view">' +
				'	<span class="lightbox-btn lightbox-prev-btn lightbox-prev-show"></span>' +
				'	<img class="lightbox-image" src="images/2-2.jpg" width="100%"/>' +
				'	<span class="lightbox-btn lightbox-next-btn lightbox-next-show"></span>' +
				'</div>' +
				//<!--图片标题区-->
				'<div class="lightbox-pic-caption">' +
				'	<div class="lightbox-caption-area">' +
				'		<p class="lightbox-pic-desc">图片标题</p>' +
				'		<span class="lightbox-of-index">当前索引：1/4</span>' +
				'	</div>' +
				//	<!--关闭按钮-->
				'	<span class="lightbox-close-btn"></span>' +
				'</div>';
			//插入到弹出层
			this.popupWin.html(strDom);
			//把遮罩层和弹出层插入body
			this.bodyNode.append(this.popupMask, this.popupWin);
		}
	}

	window['LightBox'] = LightBox;

})(jQuery);