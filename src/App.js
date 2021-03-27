import React, {useEffect, useState} from "react";
import './App.css';
import {Button, PageHeader} from "antd";
import Routes from "./Routes";
import {Link} from "react-router-dom";
import {AppContext} from "./libs/contextLib";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    if (localStorage.getItem("jwt") !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);

    localStorage.removeItem("jwt")
  }

  return (
      <div className="App">
        <PageHeader
            className="app-header"
            title={
              <Button className="title" key="1" type="link" href="/">
                <Link to="/">
                  ShareNotes
                </Link>
              </Button>
            }
            extra={isAuthenticated ? [
              <Button key="4" type="primary" onClick={handleLogout}>
                Logout
              </Button>
            ] : [
              <Button key="2" type="primary">
                <Link to="/signup">
                  Signup
                </Link>
              </Button>,
              <Button key="3" type="primary">
                <Link to="/login">
                  Login
                </Link>
              </Button>
            ]}
        />
        <AppContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
          <Routes/>
        </AppContext.Provider>
      </div>
  );
}

export default App;
