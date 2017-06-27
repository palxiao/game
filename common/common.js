/* requestAnimationFrame.js
 * by zhangxinxu 2013-09-30
*/
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
    

function lerpDistance(aim, cur, ratio){ // 目标，当前，百分比
	var del = cur - aim;
	return aim + del * ratio;
}
function lerpAngle(a, b, t){
	var d = b - a;
	if(d > Math.PI) d = d - 2 * Math.PI;
	if(d < -Math.PI) d = d + 2 * Math.PI;
	return a+d*t;
}

function calLength(x1, y1, x2, y2){
	return Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2);
}

