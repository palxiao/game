var data = function() {
	this.death = 0
	this.level = 1
	this.show = ''
}
data.prototype.init = function() {
	var proh = wHeight - 20 * 2 + 2
	$('#data').attr('style', 'top:' + proh + 'px;padding-left: 80px;');
}
data.prototype.draw = function() {
	$('.progress-bar').attr('style', 'width: ' + (actor.body - 30) / 50 * 100 + '%;');
	$('.progress-value').hide();
	if(actor.body >= 40 && actor.body < 50) { //lv2
		this.level = 2
		$('.progress-bar').removeClass('progress-bar-info')
		$('.progress-bar').addClass('progress-bar-success')
	} else if(actor.body >= 50 && actor.body < 65) { //lv3
		this.level = 3
		$('.progress-bar').removeClass('progress-bar-success')
		$('.progress-bar').addClass('progress-bar-warning')
	} else if(actor.body >= 65) { //lv4
		this.level = '∞'
		$('.progress-bar').removeClass('progress-bar-warning')
		$('.progress-bar').addClass('progress-bar-danger')
	}
	if(actor.body >= 40 && actor.body < 4.7 || actor.body >= 50 && actor.body < 51 || actor.body >= 65 && actor.body < 66) {
		actor.upgrade();
		$('.progress-value').show();
	}
	if(difficulty == 1 && moshi == 'fast') { //特殊竞速模式
		if(countdown > 0) {
			this.show = '时间：' + countdown
		} else {
			this.show = '深海绝望'
		}
	} else {
		this.show = '等级：' + this.level
	}
	ctx1.save();
	ctx1.font = "16px 微软雅黑";
	ctx1.strokeStyle = 'rgba(255, 255, 255,0.98)';
	ctx1.strokeText(this.show, 10, wHeight - 20);
	ctx1.restore();
}

function gameOver() {
	wxShare(true);
	gameStatus = true;
	wx.ready(function() {
		wx.onMenuShareTimeline({
			title: '我'+theTime+'秒内消灭了'+data.death+'只生物，称霸海洋...', // 分享标题
			link: 'http://palxp.com/game', // 分享链接
			imgUrl: 'http://palxp.com/game/images/starfish-middle0.png', // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});
	})
	mui.confirm('\n总共耗时：' + theTime + ' 秒\n消灭：' + data.death + ' 只生物', '您被吞食了', ["主界面", "英雄不朽"], function(e) {
		if(e.index == 0) {
			mui.back();
		} else location.reload()
	});
}

function gameWin() {
	wxShare(true);
	gameStatus = true;
	mui.confirm('\n总共消灭：' + data.death + ' 只生物', '游戏胜利，称霸海洋', ["主界面", "再来一局"], function(e) {
		if(e.index == 0) {
			mui.back();
		} else location.reload()
	});
}
function wxShare(e){
	if(e){
		$('#wxShare').show();
	} else{
		$('#wxShare').hide();
	}
}
