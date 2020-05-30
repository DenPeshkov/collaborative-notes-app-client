import React, {useState} from 'react';
import "./App.css"
import Routes from "./Routes";
import {Layout} from "antd";
import AppHeader from "./components/AppHeader/AppHeader";
import {AppContext} from "./libs/contextLib";

const {Content} = Layout;

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
        <Layout className="app-container">
            <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
                <AppHeader/>
                <Layout>
                    <Content className="app-container-content">
                        <Routes/>
                    </Content>
                </Layout>
            </AppContext.Provider>
        </Layout>
    );
}

export default App;