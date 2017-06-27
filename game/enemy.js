var enemy = function() {
	this.alive = [];
	this.smallEnemy = new Image()
	this.middleEnemy = new Image()
	this.largeEnemy = new Image()
	this.boss = new Image()
	this.x = []
	this.y = []
	this.l = [] //生长值
	this.body = [] //敌人体型
	this.spd = [] //移动速度
	this.type = [] //敌人类型
	this.enemySpeed = []
	this.EStype = []
	this.isAttack = [] //敌人是否具有攻击性
}
enemy.prototype.num = 25;
enemy.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.x[i] = 0;
		this.spd[i] = Math.random() * 0.02 + 0.005
		this.type[i] = '';
		this.born(i);
		this.isAttack[i] = false;
		//初始化敌人移动速度
		this.enemySpeed[i] = 7;
		//模拟敌人移动
		this.enemySpeed[i] = enemyTemp * (this.enemySpeed[i] + Math.random());
		if(Math.random() < 0.2) {
			this.EStype[i] = 1
		} else if(Math.random() > 0.2 && Math.random() < 0.35) {
			this.EStype[i] = 2
		} else if(Math.random() > 0.35 && Math.random() < 0.45) {
			this.EStype[i] = 3
		} else if(Math.random() > 0.45 && Math.random() < 0.6) {
			this.EStype[i] = 4
		} else if(Math.random() > 0.6 && Math.random() < 0.8) {
			this.EStype[i] = 5
		} else this.EStype[i] = 6
	}
	this.smallEnemy.src = 'images/enemy/blowfish-icon.png';
	this.middleEnemy.src = 'images/enemy/octo-icon.png';
	this.largeEnemy.src = 'images/enemy/crab-icon-middle.png';
	this.boss.src = 'images/enemy/squid-icon-middle.png';
}
enemy.prototype.draw = function() {
	ctx2.strokeRect(0, 0, wWidth, wHeight);
	//	ctx2.clearRect(this.x[i]-this.l[i]*0.5, this.y[i]-this.l[i]*0.5, this.l[i], this.l[i])
	for(var i = 0; i < this.num; i++) {
		if(this.alive[i]) {
			if(this.EStype[i] == 1) {
				this.x[i] += Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
			} else if(this.EStype[i] == 2) {
				this.y[i] += Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
			} else if(this.EStype[i] == 3) {
				this.x[i] -= Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
			} else if(this.EStype[i] == 4) {
				this.y[i] -= Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
			} else if(this.EStype[i] == 5) {
				this.x[i] -= Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
				this.y[i] -= Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
			} else {
				this.x[i] += Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
				this.y[i] += Math.random() * this.spd[i] * this.enemySpeed[i] * subTime
			}
			var pic;
			if(this.type[i] == 'small') {
				pic = this.smallEnemy
			} else if(this.type[i] == 'middle') {
				pic = this.middleEnemy
			} else if(this.type[i] == 'large') {
				pic = this.largeEnemy
			} else if(this.type[i] == 'boss') {
				pic = this.boss
			}
			if(this.l[i] < this.body[i]) {
				this.l[i] += this.spd[i] * subTime
			} else {
				this.isAttack[i] = true
			}
			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

			if(this.y[i] > wHeight || this.x[i] > wWidth || this.y[i] < 0 || this.x[i] < 0) {
				this.alive[i] = false;
			}
		}
	}
}
enemy.prototype.born = function(i) {
	this.x[i] = Math.floor(Math.random() * wWidth);
	this.y[i] = Math.floor(Math.random() * wHeight);
	this.l[i] = 0;
	this.body[i] = 25;
	this.alive[i] = true;
	this.isAttack[i] = false;
	var ran = Math.random();
	if(ran < flag) {
		this.type[i] = 'small';
	} else {
		if(flag == 0.7) {
			if(Math.random() > 0.5) {
				this.type[i] = 'large';
				this.body[i] = 45;
				return;
			}
		} else if(flag == 0) {
			if(Math.random() > 0.35) {
				this.type[i] = 'large';
				this.body[i] = 45;
				return;
			} else {
				this.type[i] = 'boss';
				this.body[i] = 55;
				if(moshi == 'fast') { //产出boss
					return;
				} else {
					console.log("重新排序")
					var ran = Math.random();
					if(ran <= 0.35) {
						this.type[i] = 'middle';
						this.body[i] = 35;
						return;
					} else if(ran > 0.35 && ran < 0.8) {
						this.type[i] = 'small';
						this.body[i] = 25;
						return;
					} else {
						this.type[i] = 'boss';
						this.body[i] = 55;
						return;
					}
				}
			}
		}
		this.type[i] = 'middle';
		this.body[i] = 35;
	}
}
enemy.prototype.dead = function(i) {
	this.alive[i] = false;
	this.isAttack[i] = false;
}

function enemyMonitor() {
	var enemyNum = 0;
	for(var i = 0; i < enemy.num; i++) {
		if(enemy.alive[i]) {
			enemyNum++
		}
	}
	if(enemyNum < 15) {
		sendEnemy()
		return
	}
}

function sendEnemy() {
	for(var i = 0; i < enemy.num; i++) {
		if(!enemy.alive[i]) {
			enemy.born(i);
			return
		}
	}
}