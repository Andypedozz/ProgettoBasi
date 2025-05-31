import { useState } from 'react';
import MainPage from './components/MainPage/MainPage';
import Login from './components/Login/Login';

function App() {

  const [user, setUser] = useState(null);
  
  return (
    <div>
      {user ? (
        <MainPage user={user} setUser={setUser}/>
      ) : (
        <Login setUser={setUser}/>
      )}
    </div>
  );
}

export default App;
