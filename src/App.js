import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
