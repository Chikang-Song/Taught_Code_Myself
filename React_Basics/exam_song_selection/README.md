# Instruction: React로 Audio Play/Pause 기능 구현하기

이 가이드는 React에서 **새 소리 재생 버튼**을 구현하는 방법을 다룹니다. 두 개의 버튼으로 각각 다른 새 소리를 재생하거나 일시정지할 수 있습니다. React의 **`useRef`** 훅을 사용하여 오디오 객체를 관리하며, 상태를 통해 버튼 UI를 동적으로 업데이트합니다.

---

## **목표**

- 두 개의 버튼을 사용하여 각각의 오디오 파일을 재생 및 일시정지할 수 있도록 구현.
- 버튼의 텍스트를 **"Play"** 또는 **"Pause"**로 상태에 따라 동적으로 변경.

---

## **구현 단계**

### **Step 1: 프로젝트 설정**
1. React 프로젝트를 생성하고 필요한 파일을 준비합니다.
   ```bash
   npx create-react-app audio-player
   cd audio-player
   ```
2. `App.js` 파일을 열고 기본 내용을 제거한 후 새로 작성합니다.

---

### **Step 2: 오디오 객체 생성 및 상태 관리**
1. React의 `useRef`를 사용해 오디오 객체를 생성합니다.
2. `useState`로 각 오디오의 재생 상태를 관리합니다.

#### 코드 추가:
```javascript
import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  // Ref로 Audio 객체 생성
  const bird1 = useRef(
    new Audio(
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/Hydroprogne_caspia_-_Caspian_Tern_XC432679.mp3"
    )
  );

  const bird2 = useRef(
    new Audio(
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Hydroprogne_caspia_-_Caspian_Tern_XC432881.mp3"
    )
  );

  // Play/Pause 상태 관리
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
}
```

---

### **Step 3: Play/Pause 기능 추가**
1. `toggle1`과 `toggle2` 함수를 정의합니다.
2. 각 버튼 클릭 시 오디오를 재생하거나 일시정지하며, 상태를 업데이트합니다.

#### 코드 추가:
```javascript
  function toggle1() {
    if (bird1.current.paused) {
      bird1.current.play();
      setIsPlaying1(true); // 재생 상태로 업데이트
    } else {
      bird1.current.pause();
      setIsPlaying1(false); // 일시정지 상태로 업데이트
    }
  }

  function toggle2() {
    if (bird2.current.paused) {
      bird2.current.play();
      setIsPlaying2(true); // 재생 상태로 업데이트
    } else {
      bird2.current.pause();
      setIsPlaying2(false); // 일시정지 상태로 업데이트
    }
  }
```

---

### **Step 4: 버튼 및 상태 기반 UI 추가**
1. 두 개의 버튼을 추가하고 각각 `toggle1`과 `toggle2`를 클릭 이벤트로 연결합니다.
2. 상태에 따라 버튼 텍스트를 동적으로 변경합니다.

#### 코드 추가:
```javascript
  return (
    <div>
      <button onClick={toggle1}>
        {isPlaying1 ? "⏸️ Pause Bird 1" : "▶️ Play Bird 1"}
      </button>
      <button onClick={toggle2}>
        {isPlaying2 ? "⏸️ Pause Bird 2" : "▶️ Play Bird 2"}
      </button>
    </div>
  );
}

export default App;
```

---

### **Step 5: 개발 서버 실행 및 테스트**
1. 터미널에서 개발 서버를 시작합니다:
   ```bash
   npm start
   ```
2. 브라우저에서 `http://localhost:3000`으로 이동하여 결과를 확인합니다.

#### 테스트 시나리오:
- **Play Bird 1 버튼 클릭**: 첫 번째 새 소리가 재생되고 버튼 텍스트가 "⏸️ Pause Bird 1"로 변경됩니다.
- **Pause Bird 1 버튼 클릭**: 첫 번째 새 소리가 일시정지되고 버튼 텍스트가 "▶️ Play Bird 1"로 변경됩니다.
- **Play Bird 2 버튼 클릭**: 두 번째 새 소리가 재생됩니다.
- **Pause Bird 2 버튼 클릭**: 두 번째 새 소리가 일시정지됩니다.

---

## **Tip**

- `Audio` 객체는 `useRef`를 사용하여 고정적으로 관리합니다.  
- 재생 상태를 `useState`로 동기화하여 UI와 오디오 동작 간의 불일치를 방지합니다.

---

## **완성된 코드**

```javascript
import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const bird1 = useRef(
    new Audio(
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/Hydroprogne_caspia_-_Caspian_Tern_XC432679.mp3"
    )
  );

  const bird2 = useRef(
    new Audio(
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Hydroprogne_caspia_-_Caspian_Tern_XC432881.mp3"
    )
  );

  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  function toggle1() {
    if (bird1.current.paused) {
      bird1.current.play();
      setIsPlaying1(true);
    } else {
      bird1.current.pause();
      setIsPlaying1(false);
    }
  }

  function toggle2() {
    if (bird2.current.paused) {
      bird2.current.play();
      setIsPlaying2(true);
    } else {
      bird2.current.pause();
      setIsPlaying2(false);
    }
  }

  return (
    <div>
      <button onClick={toggle1}>
        {isPlaying1 ? "⏸️ Pause Bird 1" : "▶️ Play Bird 1"}
      </button>
      <button onClick={toggle2}>
        {isPlaying2 ? "⏸️ Pause Bird 2" : "▶️ Play Bird 2"}
      </button>
    </div>
  );
}

export default App;
```

---

이제 React로 오디오 재생/일시정지 기능을 완벽하게 구현할 수 있습니다!
```
