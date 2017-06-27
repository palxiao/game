var can1, can2, ctx1, ctx2;
var lastTime, subTime = 0;
var bgPic = new Image();
var wWidth, wHight;
var enemy, enemyTemp;
var mx, my;
var actor;
var wave;
var gameStatus = false;
var flag = 0.8;
var difficulty; //游戏难度
var moshi; //游戏模式
var countdown = 59
var theTime = 0; //记录耗时

//document.body.onload = main;

function main() {
	//准备微信分享   http://palxp.com/spider_api/blog/json
	mui.ajax('http://palxp.com/jfinal_demo/weixin/circleShare?shareUrl=http://palxp.com/game/main.html', {
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		async: true,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			console.log(data);
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: 'wx3f8bf6344e14ae66', // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名，见附录1
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function() {
				wx.onMenuShareAppMessage({
					title: '天哦怎么有这么无聊的游戏', // 分享标题
					desc: '吃吃吃停不下来...', // 分享描述
					link: 'http://palxp.com/game', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'http://palxp.com/game/images/starfish-middle0.png', // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			})
		},
		error: function(xhr, type, errorThrown) {
			console.log("获取微信签名出错")
		}
	});
	//获取游戏难度
	if(localStorage.getItem('difficulty')) {
		difficulty = localStorage.getItem('difficulty')
	} else {
		difficulty = 1
	}
	//获取游戏模式
	if(localStorage.getItem('moshi')) {
		moshi = localStorage.getItem('moshi')
	} else {
		moshi = 'normal'
	}

	init();
	gameLoop();
}

function init() {
	lastTime = Date.now();
	can1 = document.getElementById('canvas1');
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');
	ctx2 = can1.getContext('2d');

	bgPic.src = './images/background.jpeg';

	//	mui.plusReady(function() {
	//		void plus.navigator.setFullscreen(false);
	wWidth = window.screen.width;
	wHeight = document.documentElement.clientHeight;
	//		wHeight = plus.screen.resolutionHeight - plus.navigator.getStatusbarHeight()
	//		wWidth = plus.screen.resolutionWidth
	$('#container').attr('height', wHeight).attr('width', wWidth);
	$('#canvas1').attr('height', wHeight).attr('width', wWidth);
	$('#canvas2').attr('height', wHeight).attr('width', wWidth);
	ctx1.globalAlpha = 0.9
	ctx1.drawImage(bgPic, 0, 0, wWidth, wHeight); //绘制背景，静态
	//初始化
	enemyTemp = 1;
	//定时改变敌人移动规律
	var timer = setInterval(function() {
		enemyTemp = -(enemyTemp);
		countdown -= 1;
		theTime += 1;
	}, 1000);
	//初始化敌人
	enemy = new enemy();
	enemy.init();
	//初始化主角
	actor = new actor();
	actor.init();

	mx = wWidth * 0.5;
	my = wHeight * 0.5;
	//初始化波动特效
	wave = new wave();
	wave.init();
	//到达时间出现其他怪物
	mui.later(function() {
		flag = 0.7;
	}, 26000);
	mui.later(function() {
		flag = 0;
	}, 60000);
	//分值计算
	data = new data();
	data.init();

	//	});

	can2.addEventListener("touchstart", function(e) {
		e.preventDefault();
		if(!gameStatus) {
			mx = e.touches[0].pageX;
			my = e.touches[0].pageY;
		}
	});
	can2.addEventListener("touchmove", function(e) {
		if(e.touches.length > 1 || e.scale && e.scale !== 1) return;
		if(!gameStatus) {
			mx = e.touches[0].pageX;
			my = e.touches[0].pageY;
		}
		//console.log(e.touches[0].pageX, e.touches[0].pageY);
	});
}

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	subTime = Date.now() - lastTime;
	if(subTime > 40) {
		subTime = 40;
	}
	lastTime = Date.now();

	//	mui.plusReady(function() {
	ctx1.drawImage(bgPic, 0, 0, wWidth, wHeight);
	enemy.draw();
	enemyMonitor();
	actor.draw();
	enemyCarsh();
	wave.draw();
	data.draw();
	//	});
}