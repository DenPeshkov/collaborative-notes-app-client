import React from 'react';
import "./App.css"
import Routes from "./Routes";
import {Layout} from "antd";
import AppHeader from "./components/AppHeader/AppHeader";

const {Content} = Layout;

function App() {

    return (
        <Layout className="app-container">
            <AppHeader/>
            <Layout>
                <Content className="app-container-content">
                    <Routes/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;