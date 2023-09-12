import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  
  const [areDimensionValid, setAreDimensionsValid] = useState(
    window.innerHeight > 600 && window.innerWidth > 320 ? true : false
  )

  useEffect(() => {
    const handleResize = () => {
      const dimensionsCheck = window.innerHeight > 600 && window.innerWidth > 320;
      if(window.innerWidth < 768) {
        localStorage.setItem('deviceWidth', "Small");
        setAreDimensionsValid(dimensionsCheck); 
      } else {
        localStorage.setItem('deviceWidth', "Medium");
        setAreDimensionsValid(dimensionsCheck); 
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {
        areDimensionValid ? 
        <Navigation/> : 
        <div className='centered' style={{width: "100%", height: "100vh"}}>
          <p style={{color: 'black'}}>Sorry, screen dimensions not supported</p>
        </div>
      }
    </div>
  );
}

export default App;
