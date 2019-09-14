/*!
 * Jquery Audio5js: 基于Audio5js的Jquery简单封装
 * http://www.cnblogs.com/yvanwu/
 * yvan.wu 2015
 */
/**
	使用方式：
	如：
	$("#voice1").audio5js({
		url : "voice/demo.mp3"
	});
 */
!function ($) {
	var Audio = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.audio5js.defaults, options);
		this.init();
	};
	Audio.prototype = {
		constructor : Audio,
		// 初始化导航
		init : function(){
			var settins = this.options;
			var ele = this.$element;
			var audio = this;
			// 初始化样式
			ele.addClass(settins['class']);
			ele.attr("title", settins.title);
			// 初始化audio5js
			settins.audio5js = new Audio5js({
				swf_path: 'https://cdnjscn.b0.upaiyun.com/libs/audio5js/0.1.9/audio5js.swf',
			  	ready: function(){
					this.load(settins.url);
		    		ele.click(function(){
		    			audio.playPause();
		    		});
		    		this.on('play', function () {
		    			ele.removeClass(settins['class']);
		    			ele.addClass(settins.playingClass);
		    		}, this);
		    		this.on('pause', function () {
		    			ele.removeClass(settins.playingClass);
		    			ele.addClass(settins['class']);
		    		}, this);
			  		this.on('ended', function () {
			  			ele.removeClass(settins.playingClass);
		    			ele.addClass(settins['class']);
			  		}, this);
		    		//error event passes error object to callback
				  	this.on('error', function (error) {
				    	//alert("播放出错！");
				  	}, this);
			  	}
			});
		},
		playPause : function () {
			var audio5js = this.options.audio5js;
	    	if (audio5js.playing) {
	      		audio5js.pause();
	      		audio5js.volume(0);
	    	} else {
	    		audio5js.seek(0); //回到最开始的位置
	      		audio5js.play();
	      		audio5js.volume(1);
	    	}
	  	},
	  	pause : function(){
	  		var audio5js = this.options.audio5js;
	  		if (audio5js.playing) {
		  		audio5js.pause();
		      	audio5js.volume(0);
	      	}
	  	},
	  	play : function(){
	  		var audio5js = this.options.audio5js;
	  		if (!audio5js.playing) {
		  		audio5js.play();
		      	audio5js.volume(1);
	      	}
	  	},
	  	getAudio5js : function(){
	  		return this.options.audio5js;
	  	}
	  	
	};
	$.fn.audio5js = function (option, value) {
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('audio');
			var options = typeof option === 'object' && option;
			if (!data) {
				$this.data('audio', (data = new Audio(this, options)));
			}
			if (typeof option === 'string') {
				methodReturn = data[option](value);
			}
		});
		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.audio5js.defaults = {
		url : "", //音频文件地址
		title : "点击播放",
		'class' : "audio", // 正常样式class
		playingClass : "audio-playing", // 播放时样式class
		audio5js : {}
	};

	$.fn.audio5js.Constructor = Audio;
}(window.jQuery);