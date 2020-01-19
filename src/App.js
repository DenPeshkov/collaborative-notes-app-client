import React, {useState} from 'react';
import Routes from "./Routes";

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
        <div style={{height: "100%"}}>
            <Routes appProps={{isAuthenticated, userHasAuthenticated}}/>
        </div>
    );
}

export default App;
