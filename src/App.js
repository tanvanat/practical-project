import logo from './logo.svg';
import './App.css';

//jsx language
function App() {
  const title = 'Welcome to Website Security Grading System';
  const link = "";

  return (
    <div className="flex justify-center items-center mt-10 mb-5">
      <div className='content'>
        <h1>{title}</h1>
        <a href="{link}">
          <img src="/logo192.png" alt="Logo" className="w-30 h-30 mt-20"/>
        </a>
      </div>
    </div>
  );
}

export default App;
