import './App.css';
import { Routes, Route} from 'react-router-dom'
import Landingpage from './components/landingpage/landingpage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Main from './components/main/Main';
import Dashboard from './components/sections/Dashboard';
import Profile from './components/sections/Profile';
import Activities from './components/sections/Activities';
import Owed from './components/sections/Owed';
import Owing from './components/sections/Owing';
import Settle from './components/sections/Settle';
import AddActivity from './components/sections/AddActivity';
import AddExpense from './components/sections/AddExpense';
import Expenses from './components/sections/Expenses';

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={< Landingpage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      <Route path="/main" element={<Main/>}>
        <Route path="/main" element={ <Dashboard/>} />
        <Route path="/main/profile" element={<Profile/>} />
        <Route path='/main/activities' element={<Activities/>}/>
        <Route path='/main/owing' element={<Owing/>}/>
        <Route path='/main/owed' element={<Owed/>}/>
        <Route path='/main/settle' element={<Settle/>}/>
        <Route path='/main/add_activity' element={<AddActivity/>}/>
        <Route path='/main/add_expense' element={<AddExpense/>}/>
        <Route path='/main/expenses' element={<Expenses/>}/>
      </Route>


      </Routes>
    
    </>
  );
}

export default App;
