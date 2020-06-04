import React from 'react';
import "./Editor.css"
import {Card, Layout, Menu} from "antd";

const {Content, Sider, Header} = Layout;
const {SubMenu} = Menu;
const {Meta} = Card;

function Editor() {
    return (
        <Layout className="editor-top-layout">
            <Content className="editor-layout-background editor-top-content">
                <Layout className="editor-layout-background">
                    <Sider breakpoint="lg" collapsedWidth="0" className="editor-layout-background editor-sider"
                           width={272} theme="dark" zeroWidthTriggerStyle={{top: "0px"}}>
                    </Sider>
                    <Content className="editor-content" style={{padding: '0 24px'}}>Content</Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Editor;