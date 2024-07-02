import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainMenu from "./components/MainMenu";
import SizeSelection from "./components/SizeSelection";
import TeamSelection from "./components/TeamSelection";

function App() {
  return (
    <Router>
      <div className="App background flex flex-col overflow-auto">
        <Navigation />
        <Routes>
          <>
            <Route
              exact
              path="/"
              element={
                  <MainMenu />
              }
            />
            <Route
              path="/qplay"
              element={
                  <SizeSelection />
              }
            />
            <Route
              path="/qplay/1"
              element={
                  <TeamSelection size={1} />
              }
            />
            <Route
              path="/qplay/2"
              element={
                  <TeamSelection size={2} />
              }
            />
            <Route
              path="/qplay/3"
              element={

                  <TeamSelection size={3} />

              }
            />
            <Route
              path="/qplay/4"
              element={

                  <TeamSelection size={4} />

              }
            />
            <Route
              path="/qplay/5"
              element={

                  <TeamSelection size={5} />

              }
            />
            <Route path="/about" />
            <Route path="/feedback" />
          </>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
