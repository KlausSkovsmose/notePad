import "./App.css";
import Navbar from "./components/navbar";
import Showcase from "./components/showcase";
import { UserProvider } from "./context/user.context";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Showcase />
      </UserProvider>
    </div>
  );
}

export default App;
