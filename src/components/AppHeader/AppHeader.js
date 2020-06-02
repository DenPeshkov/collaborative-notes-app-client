import React, {useState} from 'react';
import {Avatar, Button, Drawer, Menu, PageHeader, Popover} from "antd";
import {Link, useHistory} from "react-router-dom";
import {useAppContext} from "../../libs/contextLib";
import "./AppHeader.css"
import BarsOutlined from "@ant-design/icons/lib/icons/BarsOutlined";
import LoginOutlined from "@ant-design/icons/lib/icons/LoginOutlined";
import UserAddOutlined from "@ant-design/icons/lib/icons/UserAddOutlined";

function AppHeader() {

    const {isAuthenticated, userHasAuthenticated, isMobile} = useAppContext();
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [menuState, setMenuState] = useState("signin");
    let extra;
    const history = useHistory();

    const content =
        <div>
            <Button style={{marginBottom: "8px"}} type="dashed" block><Link to="/account">Account</Link></Button>
            <Button type="dashed" key="6" onClick={() => {
                userHasAuthenticated(false);
                history.push("/")
            }} block>Log
                out</Button>
        </div>


    switch (isAuthenticated) {
        case false: {
            extra = isMobile ?
                [
                    <Button key="5" onClick={() => setDrawerVisible(true)}
                            icon={<BarsOutlined style={{fontSize: "20px"}}/>}/>,
                    <Drawer
                        placement="right"
                        onClose={() => setDrawerVisible(false)}
                        visible={isDrawerVisible}
                        closable={false}
                    >
                        <Menu onClick={(selectedKey) => {
                            setMenuState(selectedKey.key);
                            setDrawerVisible(false)
                        }} selectedKeys={menuState}
                              mode="inline">
                            <Menu.Item key="signin" icon={<LoginOutlined/>}>
                                <Link to="/signin">Sign in</Link>
                            </Menu.Item>
                            <Menu.Item key="signup" icon={<UserAddOutlined/>}>
                                <Link to="/signup">Sign up</Link>
                            </Menu.Item>
                        </Menu>
                    </Drawer>
                ] :
                [
                    <Button key="3"><Link to="/signin">Sign in</Link></Button>,
                    <Button key="4" type="primary"><Link to="/signup">Sign up</Link></Button>,
                ];
            break;
        }
        case true: {
            extra = [/*<Button ghost={true} key="6" type="primary" onClick={() => userHasAuthenticated(false)}>Log
                out</Button>*/
                <Popover placement="bottomLeft" title={"DenPeshkov"} content={content} trigger="click">
                    <Avatar>D</Avatar>
                </Popover>]
            break;
        }
    }
    return (
        <PageHeader
            className="app-header"
            title={<Link to="/">ShareNotes</Link>}
            extra={extra}
            ghost={false}
        />
    );
}

export default AppHeader;