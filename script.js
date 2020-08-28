var rand = function (min, max) {k = Math.floor(Math.random() * (max - min) + min); return (Math.round( k / s) * s);}
var newA = function () {a = [rand(0, innerWidth),rand(0, innerHeight)];},
	newB = function () {sBody = [{x: 0,y: 0},{x: 1,y: 0}];}
var gP = document.getElementById('gP'), //Connect canvas
	nextrdy=false;
	g = gP.getContext('2d'), //get "context" (methods for drawing on canvas) // Save for convenience
	sBody = null, //Begin body snake - two element
	d = 1, //direction of the snake 1 - right, 2 - down 3 - left, 4 - up
	a = null, //Apple, array, 0 element - x, 1 element - y
	s = 50; newB(); newA(); //Create snake
gP.width = innerWidth; //Save image clarity by setting the full width of the screen
gP.height = innerHeight; //The same, but only with height
function func(){
	nextrdy=true;
	if (a[0] + s >= gP.width || a[1] + s >= gP.height) newA(); 
	g.clearRect(0,0,gP.width,gP.height); //Clear old
	g.fillStyle = "red";
	g.fillRect(...a, s, s);
	g.strokeStyle = "white";
	g.beginPath();
	g.rect(...a, s, s);	
	g.stroke();
	g.fillStyle = "green";

	

	sBody.forEach(function(el, i){
		if (el.x == sBody[sBody.length - 1].x && el.y == sBody[sBody.length - 1].y && i < sBody.length - 1) sBody.splice(0,sBody.length-1), newB(), d = 1; //Collision check
	});
	var m = sBody[0], f = {x: m.x,y: m.y}, l = sBody[sBody.length - 1]; // save head and tail
	if (d == 1)  f.x = l.x + s, f.y = Math.round(l.y / s) * s; //if direction to right, then save Y, but change X on +s 
	if (d == 2) f.y = l.y + s, f.x = Math.round(l.x / s) * s; // if direction to down, then save X, but change Y on +s
	if (d == 3) f.x = l.x - s, f.y = Math.round(l.y / s) * s; //if direction to right, then save Y, but change X on -s 
	if (d == 4) f.y = l.y - s, f.x = Math.round(l.x / s) * s; //if direction to down, then save X, but change Y on -ss
	sBody.push(f); //add tail after head with new coordinates
	sBody.splice(0,1); //Delete tail
	//draw each element of the snake
	sBody.forEach(function(pob, i){
		if (d == 1) if (pob.x > Math.round(gP.width / s) * s) pob.x = 0; //If we move to the right, then if the position of the element along X is greater than the width of the screen, then it should be reset.
		if (d == 2) if (pob.y > Math.round(gP.height / s) * s) pob.y = 0; //If we move below, then if the position of the element on X is greater than the height of the screen, then it must be reset.
		if (d == 3) if (pob.x < 0) pob.x = Math.round(gP.width / s) * s; //If we move to the left, and the position on X is less than zero, then we put the element at the very end of the screen (its width)
		if (d == 4) if (pob.y < 0) pob.y = Math.round(gP.height / s) * s; //If we move up, and the position on Y is less than zero, then we put the element at the very bottom of the screen (its height)
		if (pob.x == a[0] && pob.y == a[1]) newA(), sBody.unshift({x: f.x - s, y:l.y})
		g.fillRect(pob.x, pob.y, s, s);	
		g.beginPath();
		g.rect(pob.x, pob.y, s, s);	
		g.stroke();
		// s - this is the width and height of our "square"
	});
	setTimeout(func, 1000/4/((sBody.length-2)/20+1 ));//increase in speed after the 20th apple
}
setTimeout(func, 1000/3);
onkeydown = function (e) {
	if(!nextrdy)return;
	var k = e.keyCode;
	if ([38,39,40,37].indexOf(k) >= 0) 
		//Stop the event, cancel it default action. For example, scrolling up could happen scrolling up, but it will not happen as we canceled it.
		e.preventDefault();
	if (k == 39 && d != 3) d = 1; //Right
	if (k == 40 && d != 4) d = 2; //Down
	if (k == 37 && d != 1) d = 3; //Left
	if (k == 38 && d != 2) d = 4; //Up
	nextrdy=false;
};