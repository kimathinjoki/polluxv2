import './App.css';
import { Routes, Route} from 'react-router-dom'
import Landingpage from './components/landingpage/landingpage';

function App() {
  return (
    <>

    <Routes>
      <Route element={< Landingpage/>}/>

    </Routes>
    
    </>
  );
}

export default App;
