import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainMenu from "./components/MainMenu";
import SizeSelection from "./components/SizeSelection";
import TeamSelection from "./components/TeamSelection";

function App() {
  return (
    <Router>
      <div className="App background">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<MainMenu />} />
          <Route path="/qplay" element={<SizeSelection />}/>
          <Route path="/qplay/2" element={<TeamSelection params={2}/>}/>
          <Route path="/qplay/1" element={<TeamSelection params={1}/>}/>
          <Route path="/qplay/3" element={<TeamSelection params={3}/>}/>
          <Route path="/qplay/4" element={<TeamSelection params={4}/>}/>
          <Route path="/qplay/5" element={<TeamSelection params={5}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
