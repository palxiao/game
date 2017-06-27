function enemyCarsh() {
	for(var i = 0; i < enemy.num; i++) {
		if(enemy.isAttack[i] && gameStatus == false) {
			var l = calLength(enemy.x[i], enemy.y[i], actor.x, actor.y);
			if(l < 900) {
				if(enemy.type[i] == 'small') {
					wave.born(enemy.x[i], enemy.y[i], 50);
					enemy.dead(i);
					actor.bigger(0.3 * difficulty);
				} else if(enemy.type[i] == 'middle') {
					if(actor.body >= 40) { 
						wave.born(enemy.x[i], enemy.y[i], 100);
						enemy.dead(i);
						actor.bigger(0.6 * difficulty);
					} else {
						gameOver();
					}
				} else if(enemy.type[i] == 'large') {
					if(actor.body >= 50) {
						wave.born(enemy.x[i], enemy.y[i], 120);
						enemy.dead(i);
						actor.bigger(0.8 * difficulty);
					} else {
						gameOver();
					}
				} else if(enemy.type[i] == 'boss') {
					if(actor.body >= 65) {
						wave.born(enemy.x[i], enemy.y[i], 140);
						enemy.dead(i);
						actor.bigger(1 * difficulty);
					} else {
						gameOver();
					}
				}
			}
		}
	}
}
