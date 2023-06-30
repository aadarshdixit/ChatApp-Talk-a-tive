import "./App.css";
import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/chats" element={<Chatpage/>} />
      </Routes>
    </Router>

  );
}

export default App;
