import React, {useState} from 'react';
import "./App.css"
import Routes from "./Routes";
import {Layout} from "antd";
import AppHeader from "./components/AppHeader/AppHeader";
import {AppContext} from "./libs/contextLib";
import {useMediaQuery} from 'react-responsive'

const {Content} = Layout;

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const isMobile = useMediaQuery({
        query: '(max-width: 440px)'
    })

    return (
        <Layout className="app-container">
            <AppContext.Provider value={{isAuthenticated, userHasAuthenticated, isMobile}}>
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