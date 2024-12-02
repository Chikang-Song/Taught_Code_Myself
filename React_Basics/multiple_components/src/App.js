// Task Add Three Cards
import Card from "./components/Card";
import './App.css'

function App() {
  return (
    <h1>
      <Card h2="First cards' h2" h3="First card's h3"/>
      <Card h2="Second cards' h2" h3="Second card's h3"/>
      <Card h2="Third cards' h2" h3="Third card's h3"/>
    </h1>
  )
}

export default App;