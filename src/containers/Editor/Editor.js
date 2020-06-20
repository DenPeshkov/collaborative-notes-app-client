import React, {useState} from 'react';
import "./Editor.css"
import {Badge, Button, Input, Layout} from "antd";
import AppHeader from "../../components/AppHeader/AppHeader";
import {useAppContext} from "../../libs/contextLib";
import {Link} from "react-router-dom";
import MobileAppHeaderLayout from "../../components/AppHeader/MobileAppHeaderLayout";
import DefaultAppHeaderLayout from "../../components/AppHeader/DefaultAppHeaderLayout";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import {useMediaQuery} from 'react-responsive'
import NotesList from "../../components/NotesList/NotesList";

const {Content, Sider, Header} = Layout;
const {Search} = Input;


function Editor() {
    const {isMobile} = useAppContext();
    const [collapsed, setCollapsed] = useState(false);
    const isBroken = useMediaQuery({
        query: '(max-width: 992px)'
    })
    const [searchString, setSearchString] = useState("");

    return (
        <Layout className="editor-top-layout">
            <AppHeader left={isBroken ?
                <Button
                    icon={<MenuOutlined style={{fontSize: "20px"}}/>} onClick={() => setCollapsed(!collapsed)}/>
                :
                <Link to="/" style={{fontSize: "20px", fontWeight: 600}}>ShareNotes</Link>}
                       center={isBroken ? <Link to="/" style={{fontSize: "20px", fontWeight: 600}}>ShareNotes</Link>
                           :
                           <></>}
                       right={isMobile ? <MobileAppHeaderLayout/> : <DefaultAppHeaderLayout/>}/>
            <Layout className="editor-layout-background">
                <Sider breakpoint="lg" collapsedWidth="0" collapsed={collapsed}
                       onBreakpoint={(broken) => {
                           setCollapsed(broken)
                       }}
                       className="editor-sider"
                       width={281}
                       theme="light"
                       trigger={null}
                       style={{zIndex: "1"}}>
                    <Header className="sider-header">
                        <Search
                            placeholder="input search text"
                            onSearch={value => setSearchString(value)}
                            onChange={value => setSearchString(value.target.value)}
                            className="editor-sider-search"
                        />
                    </Header>
                    <NotesList search={searchString}/>
                </Sider>
                <Layout className="content-layout">
                    <Header className="header-content">
                        <Badge status="processing" text="Processing"/>
                    </Header>
                    <Content className="editor-content" style={{padding: '16px 24px'}}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Editor;