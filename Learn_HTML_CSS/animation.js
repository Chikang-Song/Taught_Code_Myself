const canvas = document.getElementById('my_canvas');
const context = canvas.getContext('2d');

const speed = 4;
let position = 40;
let moveSpeed = speed;
let radius = 40;

function moveBall(){
	if(position + radius > canvas.width || position - radius < 0){
		// 벽에 닿으면 방향 바꿈
		moveSpeed = -moveSpeed;
	}
	position += moveSpeed;
}

function drawBall(){
	context.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화
	context.fillStyle = "#62687f";
	context.beginPath();
	context.arc(position, 50, radius, 0, 2 * Math.PI); // 공 그리기
	context.fill();
}

function animate() {
    moveBall();
    drawBall();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
