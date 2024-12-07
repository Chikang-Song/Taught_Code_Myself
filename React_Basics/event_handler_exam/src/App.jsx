function handleClick() {
  // 1~3 까지 난수 생성
  // `Math.random()`: 0~1사이의 랜덤 부동 소수점 생성
  // `Math.floor()` : 소수점 이하는 버려 정수로 변환.
  let randomNum = Math.floor(Math.random() * 3) + 1;
  console.log(randomNum);
  // `prompt()`: 사용자로 부터 입력을 받음. 입력값은 문자열로 저장
  let userInput = prompt('type a number');
  // `alert()`: 입력받은 값을 메시지로 출력
  alert(`Computer number: ${randomNum}, Your guess: ${userInput}`);
}


// Step1: App component’s h1 element that reads: “Task: Add a button and handle a click event”.
// add a button element, with an opening and a closing button tag. 
function App() {
  return (
    <div>
      <h1>Task: Add a button and handle a click event</h1>
      <button onClick={handleClick}>Guess the number between 1 and 3.</button>
    </div>
  );
}

export default App;
