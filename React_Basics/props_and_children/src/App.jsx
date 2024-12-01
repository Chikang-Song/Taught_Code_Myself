import FruitBag from "./components/Bag.jsx";
import "./styles.css";
import React from "react";
import Apples from "./components/Apples.jsx";
import Pears from "./components/Pears.jsx";
import Oranges from "./components/Oranges.jsx";

// function Modal(props) {
//   return (
//     <div style = {{background: "rgba(0,0,0,0.5)", padding:"20px"}}>
//       {props.children}
//     </div>
//   );
// }

function App() {

  return (
    // <Modal>
    //   <h2>Important Notice</h2>
    //   <p>This is the content inside the modal.</p>
    // </Modal>
    
    <FruitBag>
      <Apples color="red" number={5} />
      <Pears friend="Peter" />
      <Oranges count={3} />
    </FruitBag>
  );
}

export default App
