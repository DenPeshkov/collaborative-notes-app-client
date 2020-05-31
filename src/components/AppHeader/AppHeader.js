import React, {useState} from 'react';
import {Button, Drawer, Menu, PageHeader} from "antd";
import {Link} from "react-router-dom";
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
            extra = [<Button ghost={true} key="6" type="primary" onClick={() => userHasAuthenticated(false)}>Log
                out</Button>];
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