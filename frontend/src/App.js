import React, {useState, useEffect} from 'react';
import HomeView from './views/HomeView';
import './App.css';

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight;
      setWindowHeight(newHeight);
      console.log("Current window height:", newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowHeight < 600) {
    // Tutaj możesz podjąć odpowiednie działania dla małego ekranu
  }

  return (
    <div>
      {
        windowHeight > 600 ? <HomeView/> : 
        <div className='centered' style={{width: "100%", height: "100vh"}}>
          <p color='white'>Sorry, screen height not supported</p>
        </div>
      }
    </div>
  );
}

export default App;
