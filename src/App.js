import './App.css';
import {PageHeader} from "antd";
import Routes from "./Routes";

function App() {
  return (
      <div className="App">
        <PageHeader
            className="app-header"
            title="ShareNotes"
        />
        <Routes/>
      </div>
  );
}

export default App;
