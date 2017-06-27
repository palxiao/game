var wave = function(){
	this.x = []
	this.y = []
	this.exist = []
	this.r = []
	this.power = []
}
wave.prototype.num = 12;
wave.prototype.init = function(){
	for (var i=0; i<this.num; i++) {
		this.exist[i] = false;
		this.r[i] = 0;
	}
}
wave.prototype.draw = function(){
	ctx2.save();
	ctx2.lineWidth = 2;
	ctx2.shadowBlur = 10;
	ctx2.shadowColor = 'white';
	for (var i=0; i<this.num; i++) {
		if( this.exist[i] ){
			this.r[i] += subTime * 0.08;
			if( this.r[i]>this.power ){
				this.exist[i] = false
			}
			var alpha = 1 - this.r[i] / this.power;
			ctx2.beginPath();
			ctx2.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI*2);
			ctx2.closePath();
			ctx2.strokeStyle = 'rgba(255, 255, 255,'+alpha+')';
			ctx2.stroke();
		}
	}
	ctx2.restore();
}
wave.prototype.born = function(x, y, power){
	for (var i=0; i<this.num; i++) {
		if( !this.exist[i] ){
			this.exist[i] = true;
			this.r[i] = 20;
			this.power = power;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
}
