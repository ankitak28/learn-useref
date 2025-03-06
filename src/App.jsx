import { createContext, useContext, useRef, useState } from "react";
import "./App.css";

const themeContext = createContext('light');
function App() {
  const [theme, setTheme] = useState('light');
  const [myCount, setMyCount] = useState(0);
  const myRef = useRef(0);
  const ref = useRef(null);
  const incrementCount = () => {
    setMyCount(myCount + 1);
  };
  const incrementRef = () => {
    myRef.current += 1;
    console.log(myRef.current);
  };
  const focusInput = () => {
    ref.current.focus();
    ref.current.style.background = "yellow";
  };
  const resetInput = () => {
    ref.current.style.background = "white";
  };
  const toggleTheme = () => {  
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }
  
  return (
    <>
      <div>
        <h2>State Count : {myCount}</h2>
        <button onClick={incrementCount}>Increment State Count</button>
      </div>
      <div>
        <h2>Ref Count : {myRef.current}</h2>
        <button onClick={incrementRef}>Increment State Count</button>
      </div>
      <div>
        <h1>Learn UseRef</h1>
        <input type="text" ref={ref} placeholder="Focus Me"></input>
        <button onClick={focusInput}>Focus</button>
        <button onClick={resetInput}>Reset</button>
      </div>
      <GlobalComponent/>
      <themeContext.Provider value={theme}>
      <div style={{ border: "2px solid black", padding: "20px" }}>
        Parent Component
        <button onClick={toggleTheme}>Toggle Theme</button>
        <ComponentA/>
      </div>
      </themeContext.Provider>
      <themeContext.Provider value='dark'>
      <div style={{ border: "2px solid black", padding: "20px" }}>
        Parent Component
        <button onClick={toggleTheme}>Toggle Theme</button>
        <ComponentA/>
      </div>
      </themeContext.Provider>
    </>
  );
}

function ComponentA() {
  return (
    <div style={{ border: "2px solid black", padding: "20px" }}>
      Child Component A
      <ComponentB/>
    </div>
  );
}

function ComponentB() {
  return (
    <div style={{ border: "2px solid black", padding: "20px" }}>
      Grand Child Component B
      <ThemedComponent  />
    </div>
  );
}

function ThemedComponent() {
  const theme = useContext(themeContext);
  return (
    <>
      <div style={{ border: "2px solid black", padding: "20px" }}>
        Great GrandChild Component <br />
        The current theme is: {theme}
      </div>
    </>
  );
}

function GlobalComponent() {
  const theme = useContext(themeContext);
  return (
    <>
      <div style={{ border: "2px solid purple", padding: "20px" }}>
        Global Component <br />
        The current theme is: {theme}
      </div>
    </>
  );
}

export default App;
