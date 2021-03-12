import './App.css';
import {Button, PageHeader} from "antd";
import Routes from "./Routes";
import {Link} from "react-router-dom";

function App() {
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
            extra={[
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
        <Routes/>
      </div>
  );
}

export default App;
