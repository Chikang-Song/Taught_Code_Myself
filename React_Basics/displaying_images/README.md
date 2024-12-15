### **Instruction의 목적 및 실습 목표 요약**

#### **목적:**
React 애플리케이션에서 **로컬 assets 폴더에 저장된 이미지를 불러와 표시하는 방법**을 배우고 실습하는 것입니다.

---

#### **실습 목표:**
1. **이미지 임포트 및 사용**:
   - `src/assets` 폴더에 저장된 이미지 파일(`logo.png`)을 **import** 구문을 사용하여 React 컴포넌트(App.js)로 가져오기.
   - 가져온 이미지를 `img` 태그의 `src` 속성에 JSX 표현식으로 설정하여 화면에 표시.

2. **React 컴포넌트의 구조 이해**:
   - `h1` 태그 아래에 이미지 추가.
   - JSX를 사용하여 컴포넌트의 UI 구조 구성.

3. **React 개발 환경 실행 및 디버깅**:
   - React 개발 서버를 시작(`npm start`)하여 변경 내용을 브라우저에서 확인.
   - 에러 발생 시 서버를 재시작하며 디버깅 방법 익히기.

---

#### **요약된 실습 단계**:
1. `App.js` 파일 열기 및 이미지 임포트:
   ```javascript
   import logo from './assets/logo.png';
   ```

2. `App` 컴포넌트의 `return` 내에 `img` 태그 추가:
   ```javascript
   <img src={logo} alt="Logo" />
   ```

3. React 개발 서버 시작 및 브라우저에서 결과 확인:
   - `npm start` 명령어로 서버 실행.
   - 브라우저에서 `http://localhost:3000`에 접속해 이미지가 렌더링되는지 확인.

---

#### **결과**:
- `h1` 아래에 `logo.png` 이미지가 화면에 정상적으로 표시됨.  
- 개발 환경과 React의 **embedded assets 처리 방법**을 익히는 실습.
- 개발환경은 CommonJS가 아닌 React Vite로 사용하여 위 Instruction과 구현시 상이한 점은 참고.