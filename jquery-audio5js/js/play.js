 function initAudio (value) {
		var audio5js = new Audio5js({
		  ready: function (player) {
			console.log(player);
			that = this
			//setTimeout(function(){
			//	that.load('voice/demo.mp3');
			//	that.play();	
			//}, 100);
			obj = playnum(value);
			if(obj != null && obj != void 0) {
				doplay(obj,0)
			}
		  }
		});
	  }

	  function doplay(obj, i=0){
		console.log(i)
		if(i>=obj.length){
			return 
		}
		setTimeout(function(){
			that.load(obj[i]);
			console.log(obj[i])
			that.play();
			doplay(obj, ++i)
		},700);
	  }
	  
	  
	  var voices = {
		  "0":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_0.mp3",
		  "1":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_1.mp3",
		  "2":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_2.mp3",
		  "3":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_3.mp3",
		  "4":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_4.mp3",
		  "5":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_5.mp3",
		  "6":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_6.mp3",
		  "7":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_7.mp3",
		  "8":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_8.mp3",
		  "9":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_9.mp3",
		  "dot":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_dot.mp3",
		  "ten":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_ten.mp3",
		  "hundred":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_hundred.mp3",
		  "thousand":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_thousand.mp3",
		  "ten_thousand":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_ten_thousand.mp3",
		  "ten_million":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_ten_million.mp3",
		  "receipt":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_receipt.mp3",
		  "success":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_success.mp3",
		  "yuan":"../addons/ewei_shopv2/plugin/cashier/static/voice/tts_yuan.mp3",
	  };
 
	  //计算万以下的数据 所需要的音频文件 写入数组obj中
	  function playnum(input) {
		  b = input.split(".");
		  var num = parseInt(b[0]);
		  var miniNum = parseInt(b[1]);
		
		  var obj = new Array()
		  obj.push(voices["receipt"]);
		  if( num >0){
			ten_thousand = parseInt(num/10000);
			console.log(ten_thousand)
			if(ten_thousand >0) {
				num -= ten_thousand*10000
				str = ""+ten_thousand
				//console.log(str)
				obj.push(voices[""+ten_thousand]);
				obj.push(voices["ten_thousand"]);
			}
			
			thousand = parseInt(num/1000);
			if(thousand >0) {
				num -= thousand * 1000;
				obj.push(voices[""+thousand]);
				obj.push(voices["thousand"]);
			}
			hundred = parseInt(num/100);
			if(hundred >0){
				num -= hundred*100;
				obj.push(voices[""+hundred]);
				obj.push(voices["hundred"]);
			}
			ten = parseInt(num/10);
			if(ten > 0){
				num -= ten*10;
				obj.push(voices[""+ten]);
				obj.push(voices["ten"]);
			}
			if(num >0) {
				obj.push(voices[""+num]);
			}
			
		  }else{
			obj.push(voices["0"]);
		  }
		  
		  
		  //2位小数
		  if(miniNum > 0){
			//dot
			obj.push(voices["dot"]);
			ge1 = parseInt(miniNum/10);
			
			if(ge1 > 0){
				miniNum -= ge1*10;
				obj.push(voices[""+ge1]);
			}
			else{
				obj.push(voices["0"]);
			}
			console.log(miniNum)
			obj.push(voices[""+miniNum]);
		  }
		  obj.push(voices["yuan"]);
			
		  return obj;
	  }