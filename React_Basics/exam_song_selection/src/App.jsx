import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  // Ref로 Audio 객체 생성 및 고정
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


  // State for play or pause status of each bird
  const [isPlaying1, setIsPlaying1] = useState(false); // bird1 상태
  const [isPlaying2, setIsPlaying2] = useState(false); // bird2 상태

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
      bird2.current.pause(); // 오디오 일시정지
      setIsPlaying2(false); // 상태 동기화
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
