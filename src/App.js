import React from 'react';
import "./App.css"
import Routes from "./Routes";
import {Layout} from "antd";
import AppHeader from "./components/AppHeader/AppHeader";

const {Content} = Layout;

function App() {

    return (
        <Layout className="app-container" style={{height: "100%"}}>
            <AppHeader/>
            <Layout>
                <Content>
                    <Routes/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;