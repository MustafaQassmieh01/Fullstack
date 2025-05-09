// import logo from './logo.svg';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Assignments from './components/Assignments';
import Editor from './components/Editor.js';
import Footer from './components/Footer';

import './App.css';



function App() {
  return (
    <div className="App">
        <Navbar />
        <HeroSection />
        <main className='main'>
        <Assignments />
        <Editor />
        </main>
        <Footer />
    </div>
  );
}

export default App;
