# React Card Task

### **개요**
이 Task는 React의 기본 개념과 컴포넌트 기반 아키텍처를 익히기 위한 실습입니다. `App.js`와 `Card.js` 두 개의 컴포넌트를 통해 데이터를 props로 전달하고, 스타일링을 적용하는 과정을 포함합니다. 

### **학습 목표**
1. **React 컴포넌트 작성**
   - React 함수형 컴포넌트(`Card`, `App`)를 작성하고, 컴포넌트 재사용성을 학습합니다.
   
2. **Props 활용**
   - 부모 컴포넌트(`App.js`)에서 자식 컴포넌트(`Card.js`)로 데이터를 전달하는 방법을 실습합니다.
   - `props`를 통해 동적 데이터를 UI에 반영하는 방식을 학습합니다.

3. **CSS 스타일링**
   - React 컴포넌트에 `className`을 사용하여 CSS 스타일을 적용합니다.
   - `.cardStyle` 클래스를 활용하여 컴포넌트별로 일관된 디자인을 제공합니다.

4. **파일 구조 관리**
   - 컴포넌트와 CSS를 별도 파일로 분리하여 프로젝트 구조를 효율적으로 관리합니다.

5. **React 파일 간 Import/Export**
   - `export default`와 `import`를 사용하여 React 파일 간 의존성을 설정하고 관리합니다.

---

### **코드 구조**
1. **`App.js`**
   - 메인 컴포넌트로, 각 `Card` 컴포넌트를 호출하여 렌더링합니다.
   - `Card` 컴포넌트에 `h2`와 `h3` 데이터를 props로 전달합니다.
   ```javascript
   import Card from "./components/Card";
   import './App.css';

   function App() {
       return (
           <h1>
               <Card h2="First card's h2" h3="First card's h3"/>
               <Card h2="Second card's h2" h3="Second card's h3"/>
               <Card h2="Third card's h2" h3="Third card's h3"/>
           </h1>
       );
   }

   export default App;
   ```

2. **`Card.js`**
   - 재사용 가능한 컴포넌트로, `props`를 통해 데이터를 수신하고 이를 UI에 출력합니다.
   ```javascript
   function Card(props) {
       return (
           <div className='cardStyle'>
               <h2>{props.h2}</h2>
               <h3>{props.h3}</h3>
           </div>
       );
   }

   export default Card;
   ```

3. **`App.css`**
   - `Card` 컴포넌트에 스타일을 적용합니다.
   ```css
   .cardStyle {
       border: 1px solid #ccc;
       padding: 16px;
       margin: 16px;
       text-align: center;
       border-radius: 8px;
       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   ```

---

### **실습 결과**
브라우저에서 실행하면 세 개의 `Card` 컴포넌트가 스타일링된 상태로 렌더링되며, 각각의 `h2`와 `h3` 값이 다르게 표시됩니다.

---

### **이 Task를 통해 배운 점**
- React의 기본 컴포넌트 구조를 이해하고 효율적으로 작성하는 방법.
- `props`를 사용하여 부모-자식 간 데이터를 전달하는 방법.
- CSS를 활용하여 React 컴포넌트에 일관된 스타일을 적용하는 방법.
- 프로젝트 구조와 파일 관리를 통해 React 애플리케이션의 확장성을 높이는 방법.

---
