import React, {useState, useEffect, createContext} from 'react';
import Navigation from './views/Navigation';
import './App.css';

export const IsMobileContext = createContext();
export const PositionContext = createContext();

function App() {
  const [areDimensionValid, setAreDimensionsValid] = useState(
    window.innerHeight > 600 && window.innerWidth > 320 ? true : false
  )
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [position, setPosition] = useState([{x: 0, y: 0}]);

  useEffect(() => {
    const handleResize = () => {
      const dimensionsCheck = window.innerHeight > 600 && window.innerWidth > 320;
      
      // Are dimensions valid check:
      if(window.innerWidth < 768) {
        localStorage.setItem('deviceWidth', "Small");
        setAreDimensionsValid(dimensionsCheck); 
      } else {
        localStorage.setItem('deviceWidth', "Medium");
        setAreDimensionsValid(dimensionsCheck); 
      }

      // Is mobile check:
      if(window.innerWidth < 900) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <IsMobileContext.Provider value={{ isMobile, setIsMobile }}>
        <PositionContext.Provider value={{ position, setPosition }}>
          {
            areDimensionValid ? 
            <Navigation/> : 
            <div className='centered' style={{width: "100%", height: "100vh"}}>
              <p style={{color: 'black'}}>Sorry, screen dimensions not supported</p>
            </div>
          }
        </PositionContext.Provider>
      </IsMobileContext.Provider>
    </div>
  );
}

export default App;
