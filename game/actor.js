var actor = function(){
	this.x;
	this.y;
	this.body;//体型
	this.actorSkin = [];
	this.angle;
	this.bodyTimer = 0;
	this.bodyCount = 8;
}
actor.prototype.init = function(){
	this.body = 30;//初始化体型大小
	this.angle = 0;
	this.x = wWidth*0.5;
	this.y = wHeight;
	for(var i=0; i<10; i++){
		this.actorSkin[i] = new Image();
		this.actorSkin[i].src = 'images/starfish-middle'+i+'.png';
	}
}
actor.prototype.draw = function(){
	this.x = lerpDistance(mx, this.x, 0.97);
	this.y = lerpDistance(my, this.y, 0.97);

	var xDvalue = mx - this.x;
	var yDvalue = my - this.y;
	var beta = Math.atan2(yDvalue, xDvalue) + Math.PI//正切
	this.angle = lerpAngle(beta, this.angle, 0.7);
	
	//升级动画
	this.bodyTimer += subTime;
	if(this.bodyTimer > 100){
		this.bodyCount = this.bodyCount + 1 ;
		this.bodyTimer = 0 ;
		if(this.bodyCount > 9){
			this.bodyCount = 9 ;
		}
	}
	
	ctx2.save();
	ctx2.translate(this.x, this.y);
	ctx2.rotate(this.angle - Math.PI/2);
	ctx2.drawImage(this.actorSkin[this.bodyCount], -this.actorSkin[this.bodyCount].width * 0.5, -this.actorSkin[this.bodyCount].height * 0.5, this.body, this.body);
	ctx2.restore();
}
actor.prototype.bigger = function(score){
	if(this.body < 80) {
		this.body += score;
		data.death += 1;
	} else{
		gameWin()
	}
}
actor.prototype.upgrade = function(){
	this.bodyCount = 0;
}
