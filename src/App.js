import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Play from './pages/Play'
import End from './pages/End'
import { useContext } from 'react';
import { Context } from './context/Context';
import { useEffect } from 'react';


function App() {

  const {setFinal,setTour} = useContext(Context);

  useEffect(() => {
    const finalData = JSON.parse(localStorage.getItem('finalStat'));
    const tourData = JSON.parse(localStorage.getItem('tour'));
    if (finalData) {
        setFinal(finalData);
    } else {
        setFinal();
    }

    if (tourData) {
        setTour(tourData);
    }
}, []);



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="play" element={<Play />} />
        <Route path="end" element={<End />} />
      </Routes>
    
    </div>
  );
}

export default App;
