//预加载图片方法

var pro = ['images/background.jpeg','images/starfish-middle0.png','images/starfish-middle1.png','images/starfish-middle2.png','images/starfish-middle3.png','images/starfish-middle4.png','images/starfish-middle5.png','images/starfish-middle6.png','images/starfish-middle7.png','images/starfish-middle8.png','images/starfish-middle9.png','images/starfish-small.png','images/enemy/blowfish-icon.png','images/enemy/crab-icon-middle.png','images/enemy/octo-icon.png','images/enemy/squid-icon-middle.png'], // 预加载图片路径
	proTip = ['正在疯狂布置海洋...','主角急匆匆进入海洋...','主角正在变装...','白色智障进入海洋...','紫色奇葩进入海洋...','红色大佬正在路上...','Boss章鱼暗中观察...'], // 预加载图片路径
	i = 0,
	timer = null,
	len = pro.length,
	load = function(src){
		if(i < len){
			$('#tip').html((proTip[i]?proTip[i]:'正在疯狂布置海洋...'));
			var img_obj = new Image();
			img_obj.src = src;
			timer = setInterval(function(){
				if( img_obj.complete ) {
					clearInterval(timer);
					mui('#loading').progressbar().setProgress( ((i+1)/len)*100 );
					load(pro[i++]);
				}
			},80);
		}else {
			//加载完成后动作
			$('.mui-content').hide();//关闭进度条
			$('#container').show();//显示主界面
			main();//执行游戏入口
		}
	};
	
	load(pro[i]);
