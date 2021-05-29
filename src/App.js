import "./App.css";

import { PlayerProvider, RealmProvider } from "./hooks/context";
import Main from "./pages/Main";

function App() {
  return (
    <RealmProvider>
      <PlayerProvider>
        <div className="App">
          <Main />
        </div>
      </PlayerProvider>
    </RealmProvider>
  );
}

export default App;
