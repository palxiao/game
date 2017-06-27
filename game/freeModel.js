var model = function() {
	this.x = [];
	this.y = [];
	this.bodySkin = [];
	this.angle = [];
}
model.prototype.num = 6;
model.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		mx2[i] = Math.floor(Math.random() * wWidth);
		my2[i] = Math.floor(Math.random() * wHeight);
	}
	for(var i = 0; i < this.num; i++) {
		this.angle[i] = 0;
		this.x[i] = wWidth * 0.5;
		this.y[i] = 0;
	}
	for(var i = 0; i < this.num; i++) {
		this.bodySkin[i] = new Image();
		this.bodySkin[i].src = 'images/starfish-small' + i + '.png';
	}
}
model.prototype.draw = function() {
	for(var i = 0; i < this.num; i++) {
		this.x[i] = lerpDistance(mx2[i], this.x[i], 0.980);
		this.y[i] = lerpDistance(my2[i], this.y[i], 0.980);

		var xDvalue = mx2[i] - this.x[i];
		var yDvalue = my2[i] - this.y[i];
		var beta = Math.atan2(yDvalue, xDvalue) + Math.PI //正切
		this.angle[i] = lerpAngle(beta, this.angle[i], 0.7);

		ctx.save();
		ctx.translate(this.x[i], this.y[i]);
		ctx.rotate(this.angle[i] - Math.PI / 2);
		ctx.drawImage(this.bodySkin[i], -this.bodySkin[i].width * 0.5, -this.bodySkin[i].height * 0.5, 20, 20);
		ctx.restore();
	}
}