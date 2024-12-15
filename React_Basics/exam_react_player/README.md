# ReactPlayer를 사용하여 다양한 비디오 콘텐츠를 손쉽게 렌더링해보기


## 설치:

`npm install react-player` 명령어로 설치.

## 가져오기:
가져오기 방법:

* 전체 플랫폼 지원: import ReactPlayer from "react-player";
* 특정 플랫폼 지원(번들 크기 감소): import ReactPlayer from "react-player/youtube";

## 사용예제
React Player를 사용해 YouTube 동영상을 렌더링하는 간단한 예제

```
import React from "react";
import ReactPlayer from "react-player/youtube";

const MyVideo = () => {
  return (
    <ReactPlayer 
      url="https://youtu.be/T17AR8cVmto?si=tgyxgiuL1sfnEMgg" 
      controls 
      width="100%" 
      height="360px" 
    />
  );
};

const App = () => {
  return (
    <div>
      <h1>React Player Example</h1>
      <MyVideo />
    </div>
  );
};

export default App;

```