var wWidth = window.screen.width;
var wHeight = document.documentElement.clientHeight;
var mx = [];
var mx2 = [];
var my = [];
var my2 = [];

document.getElementById('can').setAttribute('width', wWidth);
document.getElementById('can').setAttribute('height', wHeight);

can = document.getElementById('can');
ctx = can.getContext('2d');

can.addEventListener("touchstart", function(e) {
	e.preventDefault();
	for(var i = 0; i < actor.num; i++) {
		mx[i] = mx2[i] = e.touches[0].pageX;
		my[i] = my2[i] = e.touches[0].pageY;
	}
	//进行了点击
	document.getElementById('tip').style.display="none";

});
can.addEventListener("touchmove", function(e) {
	if(e.touches.length > 1 || e.scale && e.scale !== 1) return;
	for(var i = 0; i < actor.num; i++) {
		mx[i] = mx2[i] = e.touches[0].pageX;
		my[i] = my2[i] = e.touches[0].pageY;
	}
});

var actor = function() {
	this.x = [];
	this.y = [];
	this.bodySkin = [];
	this.angle = [];
}
actor.prototype.num = 6;
actor.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		mx[i] = Math.floor(Math.random() * wWidth);
		my[i] = Math.floor(Math.random() * wHeight);
	}
	for(var i = 0; i < this.num; i++) {
		this.angle[i] = 0;
		this.x[i] = wWidth * 0.5;
		this.y[i] = wHeight;
	}
	for(var i = 0; i < this.num; i++) {
		this.bodySkin[i] = new Image();
		this.bodySkin[i].src = 'images/starfish-small' + i + '.png';
	}
}
actor.prototype.draw = function() {
	ctx.clearRect(0, 0, wWidth, wHeight);
	for(var i = 0; i < this.num; i++) {
		this.x[i] = lerpDistance(mx[i], this.x[i], 0.989);
		this.y[i] = lerpDistance(my[i], this.y[i], 0.989);

		var xDvalue = mx[i] - this.x[i];
		var yDvalue = my[i] - this.y[i];
		var beta = Math.atan2(yDvalue, xDvalue) + Math.PI //正切
		this.angle[i] = lerpAngle(beta, this.angle[i], 0.7);

		ctx.save();
		ctx.translate(this.x[i], this.y[i]);
		ctx.rotate(this.angle[i] - Math.PI / 2);
		ctx.drawImage(this.bodySkin[i], -this.bodySkin[i].width * 0.5, -this.bodySkin[i].height * 0.5, 20, 20);
		ctx.restore();
	}
}