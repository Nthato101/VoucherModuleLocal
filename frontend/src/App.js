import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import CreatePage from "./pages/CreatePage";
import RedeemPage from "./pages/RedeemPage";



function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path='/' element={<LandingPage/>}/>
                  <Route path='/vadmin' element={<AdminPage/>}/>
                  <Route path='/vcreate' element={<CreatePage/>} />
                  <Route path='/vredeem' element={<RedeemPage/>} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
