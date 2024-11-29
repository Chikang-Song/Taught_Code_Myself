컴포넌트를 기본 내보내기(default export) 또는 이름 내보내기(named export)로 내보낼 수 있다는 것을 배웠습니다. 또한, 이러한 컴포넌트를 어떻게 가져오는지(import)도 배웠습니다.

기본 예제를 통해 이를 실습해 보겠습니다. 이번 연습에서는 컴포넌트를 별도의 파일에 저장하고, 이를 부모 컴포넌트에 가져와 화면에 렌더링할 수 있도록 하는 방법을 연습하게 됩니다.

```
# App.js
function Heading() {
  return (
    <h1></h1>
  )
}

function App() {
  return (
    <div className="App">
      This is the starting code for "Your first component" ungraded lab
      <Heading />
    </div>
  );
}

export default App;
```

##Step

###Step 1
`App.js`에서 `Heading` 함수를 분리하여 “Heading.js”라는 이름의 별도 컴포넌트 파일로 이동하세요.

또한, 새로운 파일을 생성하려면 `src` 폴더를 마우스 오른쪽 버튼으로 클릭한 후 나타나는 컨텍스트 메뉴에서 **New File** 명령을 클릭하면 됩니다.

**New File** 명령을 클릭한 후, 새 파일 이름과 확장자를 입력해야 합니다. 이 경우 **Heading.js**를 입력합니다.

`Heading.js`를 입력한 후 **ENTER** 키를 누르면 파일 이름 지정이 완료됩니다. **ENTER** 키를 누르면 새로 생성된 빈 `Heading.js` 파일이 표시되며, 여기에 코드를 작성하고 업데이트할 수 있습니다.

###Step 2
Heading 컴포넌트를 App 컴포넌트로 가져(Import)오세요.

###Step 3
This is the starting code for “Your first component” ungraded lab라고 적힌 문장을 제거하여 App 컴포넌트의 return 문에는 Heading JSX 요소만 남도록 하세요.

###Step 4
앱을 저장하고 브라우저에서 확인하세요.
