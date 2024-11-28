# EHS Chemical Sweep Dashboard 구현 가이드

## 프로젝트 설정 및 구현 단계

### 1. 초기 프로젝트 설정
```bash
mkdir ehs-dashboard
cd ehs-dashboard
npm init react-app .
```

### 2. 필요한 패키지 설치
```bash
npm install @shadcn/ui lucide-react
npm install tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge
```

### 3. 프로젝트 구조 설정
```bash
npx tailwindcss init -p
```

### 4. 디렉토리 및 파일 구조
```
ehs-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── card.jsx
│   │   └── EHSChemicalSweep.js
│   ├── App.js
│   └── index.css
└── tailwind.config.js
```

### 5. 파일 설정

#### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 기존 CSS 코드는 이 아래에 위치 */
```

#### src/components/ui/card.jsx
```jsx
import React from "react";

const Card = ({ className = "", ...props }) => (
  <div
    className={`rounded-lg border bg-white shadow-sm ${className}`}
    {...props}
  />
);

const CardHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
);

const CardTitle = ({ className = "", ...props }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);

const CardContent = ({ className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent };
```

#### App.js 수정
```jsx
import React from 'react';
import EHSChemicalSweep from './components/EHSChemicalSweep';

function App() {
  return (
    <div className="App">
      <EHSChemicalSweep />
    </div>
  );
}

export default App;
```

### 6. VS Code 설정
1. 필수 확장 프로그램 설치:
   - PostCSS Language Support
   - Tailwind CSS IntelliSense

2. (선택사항) VS Code settings.json 설정
```json
{
  "css.validate": false,
  "tailwindCSS.emmetCompletions": true
}
```

### 7. 실행
```bash
npm start
```

## 주의사항
- Tailwind 디렉티브는 반드시 index.css 파일 최상단에 위치해야 함
- VS Code 확장 프로그램이 설치되어 있지 않으면 CSS 경고가 발생할 수 있음
- node_modules가 제대로 설치되어 있는지 확인

## 문제 해결
- @tailwind 관련 경고가 발생하는 경우 VS Code PostCSS Language Support 확장 프로그램 설치로 해결
- npm 관련 에러 발생 시 `npm install` 재실행
- 스타일이 적용되지 않는 경우 Tailwind 설정 파일 확인

이 문서는 EHS Chemical Sweep Dashboard 구현을 위한 기본 설정과 구조를 설명합니다. 추가적인 기능이나 스타일링이 필요한 경우 각 컴포넌트 파일을 수정하면 됩니다.
