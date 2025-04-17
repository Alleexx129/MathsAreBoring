import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './App.css';

function MainPage() {
  return (
    <>
      <Router basename="/MathsAreBoring">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<App />} />
        </Routes>
      </Router>
      <div className="MainPage">
        <p>If you are not redirected automatically, <a href="https://alleexx129.github.io/MathsAreBoring/WorkspaceExample/">click here</a>.</p>
      </div>
    </>
  );
}

export default MainPage;