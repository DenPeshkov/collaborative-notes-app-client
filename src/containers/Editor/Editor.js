import React, {useState} from 'react';
import "./Editor.css"
import {Button, Layout} from "antd";
import AppHeader from "../../components/AppHeader/AppHeader";
import {useAppContext} from "../../libs/contextLib";
import {Link} from "react-router-dom";
import MobileAppHeaderLayout from "../../components/AppHeader/MobileAppHeaderLayout";
import DefaultAppHeaderLayout from "../../components/AppHeader/DefaultAppHeaderLayout";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import {useMediaQuery} from 'react-responsive'

const {Content, Sider} = Layout;


function Editor() {
    const {isMobile} = useAppContext();
    const [collapsed, setCollapsed] = useState(false);
    const isBroken = useMediaQuery({
        query: '(max-width: 992px)'
    })

    return (
        <Layout className="editor-top-layout">
            <AppHeader left={isBroken ?
                <Button icon={<MenuOutlined style={{fontSize: "20px"}}/>} onClick={() => setCollapsed(!collapsed)}/>
                :
                <Link to="/" style={{fontSize: "20px", fontWeight: 600}}>ShareNotes</Link>}
                       center={isBroken ? <Link to="/" style={{fontSize: "20px", fontWeight: 600}}>ShareNotes</Link>
                           :
                           <></>}
                       right={isMobile ? <MobileAppHeaderLayout/> : <DefaultAppHeaderLayout/>}/>
            <Content className="editor-layout-background editor-top-content">
                <Layout className="editor-layout-background">
                    <Sider breakpoint="lg" collapsedWidth="0" collapsed={collapsed}
                           onBreakpoint={(broken) => {
                               setCollapsed(broken)
                           }}
                           className="editor-layout-background editor-sider"
                           width={272} theme="dark" trigger={null}>
                    </Sider>
                    <Content className="editor-content" style={{padding: '0 24px'}}>Content</Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Editor;