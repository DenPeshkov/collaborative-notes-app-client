import React from 'react';
import "./App.css"
import {Button, Col, Layout, Menu, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import Routes from "./Routes";

const {Header, Sider, Content} = Layout;
const {Title} = Typography;

function App() {

    return (
        <div className="App container" style={{height: "100%"}}>
            <Layout style={{height: "100%"}}>
                <Header>
                    <Row>
                        <Col span={4}>
                            <Link to="/">
                                <Title style={{color: "white"}}>ShareNotes</Title>
                            </Link>
                        </Col>
                        <Col span={4} offset={16}>
                            <Menu mode="horizontal" theme="dark" selectable={false}>
                                <Menu.Item key="1">
                                    <Button ghost={true}>Sign in</Button>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Button type="primary" ghost={true}>Sign up</Button>
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0" theme="light">
                    </Sider>
                    <Routes/>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;