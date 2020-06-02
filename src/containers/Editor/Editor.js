import React from 'react';
import "./Editor.css"
import {Input, Layout, Menu} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LaptopOutlined from "@ant-design/icons/lib/icons/LaptopOutlined";
import NotificationOutlined from "@ant-design/icons/lib/icons/NotificationOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";

const {Content, Sider, Header} = Layout;
const {SubMenu} = Menu;

function Editor() {
    return (
        <Layout className="editor-top-layout">
            <Header className="editor-header">
            </Header>
            <Content className="editor-layout-background editor-top-content">
                <Layout className="editor-layout-background">
                    <Sider className="editor-layout-background editor-sider" width={200} theme="light">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            className="editor-sider-menu"
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content className="editor-content" style={{padding: '0 24px'}}>Content</Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Editor;