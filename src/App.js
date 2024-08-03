import logo from './logo.svg';
import './App.css';

//jsx language
function App() {
  const title = 'Welcome to Website Security Grading System';
  const likes = 50;

  return (
    <div className="App">
      <div className='content'></div>
      <h1>{title}</h1>
      <p>Liked {likes} times</p>

    </div>
  );
}

export default App;
