window.onload = function(){
	var body = document.querySelector("body");
	var startBtn = document.querySelector(".startGame");
	var success = document.querySelector(".success");
	var fail = document.querySelector(".fail");
	var box = document.querySelector(".box");
	var box1 = document.querySelector(".box1");
	var box2 = document.querySelector(".box2");
	var box3 = document.querySelector(".box3");
	var bottom = document.querySelector(".bottom");
	var level = 1;//关卡
	var start = 0;//游戏状态
	var sp = 2;//速度
	var timer; //
	var letterList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	startBtn.onclick = gameStart; 
	function gameStart(){
		//初始化数据
		var score = 0;//分数
		var lose = 0;//失分
		var llist = letterList.slice(0,letterList.length);
		var nowlist = new Array();
		startBtn.style.opacity = 0.5;
		startBtn.style.cursor = "not-allowed";
		box1.querySelector("span").innerHTML = level;
		box2.querySelector("span").innerHTML = score;
		box3.querySelector("span").innerHTML = lose;
		
		function createimg(){
			console.log("能够生成的库："+llist);
			var img = document.createElement("img");
			var index = Math.floor(Math.random()*llist.length);
			img.className = "active";
			img.style.left = Math.round(Math.random()*(body.offsetWidth-100))+"px";
			img.style.top = Math.round(Math.random()*(-100))+"px";
			img.src = "img/"+llist[index]+".png";
			console.log("生成并移除列表的字母，下标"+index+"："+llist[index]);
			var s = llist.splice(index,1);
			nowlist.push(s);
			console.log("按下得分的字母"+nowlist);
			body.appendChild(img);
		}
		if(start == 0){
			start = 1;
			var imglist = body.querySelectorAll(".active");
			if(imglist.length>0){
				for(var i = 0; i < imglist.length; i++){
					body.removeChild(imglist[i]);
				}
			}
			for(var i=0; i < level+2;i++){
				createimg();
			}
			clearInterval(timer);
			function gameover(){
				clearInterval(timer);
				box.style.display = "block";
				var timer2 = setInterval(function(){
					fail.style.top = fail.offsetTop + 20+"px";
					if(fail.offsetTop >= 0){
						clearInterval(timer2);
						start = 0;
					}
				},40);
				lose = 5;
				box2.querySelector(".score").innerHTML = lose;
				fail.querySelector("div").onclick = function(){
					if(start == 0){
						var timer2 = setInterval(function(){
							fail.style.top = fail.offsetTop - 20+"px";
							if(fail.offsetTop <= -100){
								clearInterval(timer2);
								box.style.display = "none";	
								level = 1;
								sp = 2;
								//start = 0;
								gameStart();
							}
						},40);	
					}
				}
				window.onkeyup = function(e){
					var e = e||event;
					if(e.keyCode == 13 && start==0){
						var timer2 = setInterval(function(){
							fail.style.top = fail.offsetTop - 20+"px";
							if(fail.offsetTop <= -414){
								clearInterval(timer2);
								box.style.display = "none";	
								level = 1;
								sp = 2;
								//start = 0;
								gameStart();
							}
						},40);	
					}
				};
				
			}
			timer = setInterval(imgRun,50);
			function imgRun(){
				var imglist = body.querySelectorAll(".active");
				for(var i = 0; i < imglist.length; i++){ 
					imglist[i].style.top = imglist[i].offsetTop + sp +"px";
					if(imglist[i].offsetTop >= bottom.offsetTop){
						llist.push(nowlist.splice(i,1));
						createimg();
						body.removeChild(imglist[i]);
						lose++;
						box2.querySelector(".score").innerHTML = lose;
					}
				}
				if(lose >= 5){
					gameover();
				}
			} 
			window.onkeyup = function(e){
				var e = e||event;
				var imglist = body.querySelectorAll(".active");
				//按下字母，得分或失分
				if(e.keyCode >=65 && e.keyCode <= 90){
					var keydown = String.fromCharCode(e.keyCode);
					var right = 0;
					console.log("按下得分的字母（key）："+nowlist);
					for(var i = 0; i < nowlist.length; i++){
						if(keydown == nowlist[i]){
							console.log("所按下的得分字母："+nowlist[i]);
							var s = nowlist.splice(i,1);
							llist.push(s);
							body.removeChild(imglist[i]);
							score++;
							box3.querySelector(".score").innerHTML = score;
							right = 1;
							setTimeout(function(){
								createimg();
							},20);
						}
					}
					if(right == 0){
						lose++;
						box2.querySelector(".score").innerHTML = lose;
					}
				}
				//失分达到5，结束游戏
				if(lose == 5){
					gameover();
				}
				//得分达到15，下一关
				if(score >= 15){
					clearInterval(timer);
					box.style.display = "block";
					var timer2 = setInterval(function(){
						if(success.offsetTop >= 0){
							clearInterval(timer2);
							start = 0;
							level++;
						}
						success.style.top = success.offsetTop + 20+"px";
					},40);
					success.querySelector("div").onclick = function(){
						if(start == 0){
							var timer2 = setInterval(function(){
								success.style.top = success.offsetTop - 20+"px";
								if(success.offsetTop <= -100){
									clearInterval(timer2);
									box.style.display = "none";	
									//start = 0;
									sp+= 0.5;
									gameStart();
								}
							},40);	
						}
					}
					window.onkeyup = function(e){
						var e = e||event;
						if(e.keyCode == 13 && start==0){
							var timer2 = setInterval(function(){
								success.style.top = success.offsetTop - 20+"px";
								if(success.offsetTop <= -414){
									clearInterval(timer2);
									box.style.display = "none";	
									//start = 0;
									sp+= 0.5;
									gameStart();
								}
							},40);	
						}
					};
				}
			}
		}
		
		
	}
}
