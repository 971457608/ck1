//
var a1 = 10;
var a2 = "hello word";
console.log(a1+"，"+a2);

var c1 ;
var c2 = null;
console.log(c2+","+typeof c2);
console.log(c2==c1);

var d1 = 100.00, d4 = 10.5e3;
console.log(d4);

console.log(-12/0);

console.log(isNaN(0/0));

//类型转换
var n1 = "10.5";
//parseInt 转为number类型   去掉小数部分 
console.log(parseInt(n1));

var n2 = "100.5555555";
console.log(parseFloat(n2).toFixed(2));  
console.log(Math.round(n2)); 

var s1 = "12312";

function xunhuan(){
	var s = 0, i = 0;
//	while(i<100){
//		i++;
//		s += i;
//	}
//	do{
//		i++;
//		s += i; 
//	}while(i<100);
//	console.log(s); 
	for(var j = 0; j <= 100; j++){
		s += j;
	}
	console.log(s);
}
xunhuan();
 