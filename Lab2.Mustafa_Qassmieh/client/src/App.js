// import logo from './logo.svg';
import Navbar from './components/Navbar/Navbar.js';
import HeroSection from './components/hero/HeroSection.js';
import Assignments from './components/Assignments/Assignments.js';
import Editor from './components/Editor/Editor.js';
import Footer from './components/Footer/Footer.js';

import './css/App.css';




function App() {
  return (
    <div className="App">
        <Navbar />
        <main className='main'>
        <HeroSection />
        <div className = 'content'>
        <Assignments />
        <Editor />
        </div>
        <Footer />
        </main>
    </div>
  );
}

export default App;
