function getattrStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];
	}else{
		console.log(1)
		return obj.currentStyle[attr];
	}
}
//obj 对象
//attr 属性
//target 目标值
//s 时间
//fn 回调函数
function move(obj,attr,target,s,fn){
	if(attr=="opacity"){
		var target = target*100;
	}else{
		var target = target;
	}
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//获取当前位置
		if(attr=="opacity"){
			var start = parseFloat(getattrStyle(obj,attr))*100;
		}else{
			var start = parseFloat(getattrStyle(obj,attr));
		}
		//速度
		var speed = (target-start)/5;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		//运动
		if(start==target){
			clearInterval(obj.timer);
		}else{
			if(attr=="opacity"){
				obj.style.opacity = (start+speed)/100;
				obj.style.filter="alpha(opacity="+start+speed+")";
			}else{
				obj.style[attr] = start+speed+"px";
			}
		}
	},s)
}

