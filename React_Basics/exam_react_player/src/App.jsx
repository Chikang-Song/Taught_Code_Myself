import { useState } from 'react'
import './App.css'
import ReactPlayer from "react-player/youtube";

const MyVideo = () => {
  return (
    <ReactPlayer 
      url = 'https://youtu.be/T17AR8cVmto?si=tgyxgiuL1sfnEMgg'
      controls
      width = "100%"
      height = "250px"
    />
  );
}

const App = () => {
  return (
    <div>
      <h1>React Player Example</h1>
      <MyVideo />
    </div>
  );
}

export default App;
