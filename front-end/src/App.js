
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import FirstPage from './Firstpage'; 
import Loading from './Loading';
import Output from './Output';
import Example from './Example';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Example />} />
        {/* <Route path="/Firstpage" element={<FirstPage />} />
        <Route path="/Loading" element={<Loading />}/>
        <Route path="/Output" element={<Output/>}/> */}
      </Routes>
    </Router>
  );
}
