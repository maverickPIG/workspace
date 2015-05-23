require.config({ //第一块，配置
	baseUrl: "",
	paths: {
		jquery: 'vendor/jquery/jquery',
		avalon: "vendor/avalon/avalon", //必须修改源码，禁用自带的加载器
		'text': "vendor/require/text",
		domReady: "vendor/require/domReady",
		'css': 'vendor/require/css.js'
	},
	priority: ['text', 'css'],
	shim: {
		jquery: {
			exports: "jQuery"
		},
		avalon: {
			exports: "avalon"
		}
	}
})
var test = null;
require(['avalon', 'domReady!'], function() { //第二块，添加根vm（处理公用部分）
	avalon.log("加载avalon完毕，开始构建根VM与加载其他模块")
	avalon.templateCache.empty = "&nbsp;"
	avalon.config({
		loader: false
	})
	avalon.define({
		$id: "root",
		header: "这是根模块，用于放置其他模块公用的部分,比如<br>用户名</br>什么的",
		footer: "脚本信息",
		page: "empty"
	})
	avalon.scan(document.body)

	require(['./modules/aaa/aaa'], function() { //第三块，加载其他模块
		avalon.log("加载其他完毕")
	})
})