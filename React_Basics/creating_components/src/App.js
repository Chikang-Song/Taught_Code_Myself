import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import './App.css';

// Header로 importing...
// function Heading() {
//   return <h1>This is an h1 heading</h1>
// }

function App() {
  return ( 
    <div>  
      <Header name='Chikang' color='Purple'/> 
      <Main greet='안녕하세요'/>
      <Sidebar greet='Hi'/>
    </div> 
  ); 
} 

export default App;
