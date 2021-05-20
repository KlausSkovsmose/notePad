import "./App.css";
import Navbar from "./components/navbar";
import Showcase from "./components/showcase";
import { UserProvider } from "./context/user.context";
import { Switch, Route } from "react-router";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Showcase />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
