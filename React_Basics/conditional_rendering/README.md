# React 조건부 렌더링 학습 가이드

## **학습 목표**

강의에서 중점적으로 다룬 두 가지 핵심 학습 목표:

1. **조건부 렌더링의 두 가지 방식 이해**:
    - `if-else` 문을 통한 복잡한 조건 처리.
    - 삼항 연산자를 사용한 간단한 조건부 UI 렌더링.
2. **시간과 날짜에 기반한 동적 UI 구현**:
    - 요일별 메시지 출력 및 아침 시간대 조건부 메시지 표시.

---

## **실습 프로젝트: 동적 메시지 출력 앱**

이 앱은 **create-react-app**으로 생성된 React 스타터 프로젝트를 기반으로 하며, 컴퓨터의 로컬 시간을 활용해 동적 메시지를 표시합니다.

### 주요 기능:

1. **요일별 맞춤 메시지 출력**: 요일에 따라 다른 메시지 표시.
2. **아침 시간대 메시지 추가 출력**: 오전(6~12시)인 경우 메시지 추가.
### **코드 및 주요 개념**

### **1. 전체 코드**

```jsx
function App() {
  // 1. 현재 시간 및 날짜 정보 가져오기
  const time = new Date(); // 현재 시간 데이터를 Date 객체로 생성
  const day = time.toLocaleString("en-us", { weekday: "long" });
  // 요일 이름을 영어 전체 형식으로 반환 (예: "Monday", "Tuesday").
  const morning = time.getHours() >= 6 && time.getHours() <= 12;
  // 오전 6~12시 사이인지 Boolean 값으로 확인.
  let dayMessage;

  // 2. 요일별 메시지 설정 (if-else 사용)
  if (day.toLowerCase() === "monday") {
    dayMessage = `Happy ${day}`;
  } else if (day.toLowerCase() === "tuesday") {
    dayMessage = `${day}, four days to go`;
  } else if (day.toLowerCase() === "wednesday") {
    dayMessage = `${day}, half way there`;
  } else if (day.toLowerCase() === "thursday") {
    dayMessage = `${day}, start planning the weekend`;
  } else if (day.toLowerCase() === "friday") {
    dayMessage = `Woo-hoo, the weekend is coming!`;
  } else {
    dayMessage = "Stay calm and keep having fun";
  }

  // 3. 조건부 메시지 렌더링 (삼항 연산자 사용)
  return (
    <div className="App">
      <h1>{dayMessage}</h1>
      {morning ? <h2>Have you had breakfast yet?</h2> : ''}
    </div>
  );
}

export default App;

```

---

### **2. 조건부 렌더링의 두 가지 방식**

**1. If-Else 문**:

- **용도**: 복잡한 조건 처리를 위해 사용.
- **강의에서의 활용**:
    - `day` 변수의 값을 기반으로 요일별 메시지 생성.
- **예시**:
    
    ```jsx
    if (day.toLowerCase() === "monday") {
      dayMessage = `Happy ${day}`;
    } else {
      dayMessage = "Other day message";
    }
    
    ```
    

**2. 삼항 연산자**:

- **용도**: 간단한 조건부 처리를 위해 사용.
- **강의에서의 활용**:
    - `morning` 값에 따라 아침 시간 메시지를 추가로 출력.
- **예시**:
    
    ```jsx
    {morning ? <h2>Have you had breakfast yet?</h2> : ''}
    
    ```
    

---

### **3. 시간 및 출력 예시**

| 시간 | Morning 여부 | 출력 결과 |
| --- | --- | --- |
| 오전 9시 | `true` | 요일 메시지 + "Have you had breakfast yet?" |
| 오후 7시 | `false` | 요일 메시지만 표시 |
| 주말 | `false` | "Stay calm and keep having fun" 메시지 |

---

### **출력 결과 시뮬레이션**

### 월요일 오전 9시:

```html
<h1>Happy Monday</h1>
<h2>Have you had breakfast yet?</h2>

```

### 목요일 오후 7시:

```html
<h1>Thursday, start planning the weekend</h1>
```

### 토요일:

```html
<h1>Stay calm and keep having fun</h1>
```

---

### **결론**

이 강의는 React에서 조건부 렌더링을 구현하는 두 가지 기법을 실습 프로젝트를 통해 명확히 설명했습니다. 특히, 동적 메시지 앱을 통해 학습자는 다음을 이해할 수 있습니다:

1. **If-Else 문**: 복잡한 조건 처리를 위한 활용법.
2. **삼항 연산자**: 간단한 조건부 처리를 위한 활용법.
3. **Date 객체와 시간 정보 처리**: 현재 시간과 요일 정보를 동적으로 활용하는 방법.

---

### **한 줄 요약**

React의 조건부 렌더링을 사용해 시간과 요일에 따라 메시지를 출력하는 동적 앱을 구현했습니다.