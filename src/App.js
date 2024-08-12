import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainMenu from "./components/MainMenu";
import TeamSelection from "./components/TeamSelection";
import About from "./pages/About";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <Router>
      <div className="App background flex flex-col overflow-auto h-screen">
        <Navigation />
        <Routes>
          <>
            <Route exact path="/" element={<MainMenu />} />
            <Route path="/qplay" element={<TeamSelection />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
          </>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
