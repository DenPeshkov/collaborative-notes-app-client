import React, {useState} from 'react';
import "./Editor.css"
import {Button, Divider, Dropdown, Layout, Menu} from "antd";
import AppHeader from "../../components/AppHeader/AppHeader";
import {useAppContext} from "../../libs/contextLib";
import {Link} from "react-router-dom";
import MobileAppHeaderLayout from "../../components/AppHeader/MobileAppHeaderLayout";
import DefaultAppHeaderLayout from "../../components/AppHeader/DefaultAppHeaderLayout";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import {useMediaQuery} from 'react-responsive'
import NotesList from "../../components/NotesList/NotesList";
import GroupsList from "../../components/GroupsList/GroupsList";

const {Content, Sider} = Layout;


function Editor() {
    const {isMobile} = useAppContext();
    const [collapsedLeft, setCollapsedLeft] = useState(false);
    const [collapsedRight, setCollapsedRight] = useState(false);
    const isBroken = useMediaQuery({
        query: '(max-width: 992px)'
    })

    const menu = <Menu onClick={(e) => e.key === "1" ? setCollapsedLeft(!collapsedLeft) : setCollapsedRight(!collapsedRight)}>
        <Menu.Item key="1">Open groups</Menu.Item>
        <Menu.Item key="2">Open notes</Menu.Item>
    </Menu>

    return (
        <Layout className="editor-top-layout">
            <AppHeader left={isBroken ?
                <Dropdown overlay={menu}>
                    <Button icon={<MenuOutlined style={{fontSize: "20px"}}/>}/>
                </Dropdown>
                :
                <Link to="/" style={{fontSize: "20px", fontWeight: 600}}>ShareNotes</Link>}
                       center={isBroken ? <Link to="/" style={{fontSize: "20px", fontWeight: 600}}>ShareNotes</Link>
                           :
                           <></>}
                       right={isMobile ? <MobileAppHeaderLayout/> : <DefaultAppHeaderLayout/>}/>
            <Content className="editor-layout-background editor-top-content">
                <Layout className="editor-layout-background">
                    <Sider breakpoint="lg" collapsedWidth="0" collapsed={collapsedLeft}
                           onBreakpoint={(broken) => {
                               setCollapsedLeft(broken)
                           }}
                           className="editor-sider-left"
                           width={281} theme="light" trigger={null}>
                        <GroupsList/>
                    </Sider>
                    <Content className="editor-content" style={{padding: '0 24px'}}>Content</Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Editor;