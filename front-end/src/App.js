
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import FirstPage from './Firstpage'; 
import Loading from './Loading';
import Output from './Output';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Firstpage" element={<FirstPage />} />
        <Route path="/Loading" element={<Loading />}/>
        <Route path="/Output" element={<Output/>}/>
      </Routes>
    </Router>
  );
}
