import React, {useState} from 'react';
import {useAppContext} from "../../libs/contextLib";
import {Avatar, Button, Drawer, Popover} from "antd";
import {Link, useHistory} from "react-router-dom";
import BarsOutlined from "@ant-design/icons/lib/icons/BarsOutlined";

function MobileAppHeaderLayout() {
    const {isAuthenticated, userHasAuthenticated} = useAppContext();

    function AuthenticatedLayout() {
        const history = useHistory();
        const content =
            <>
                <Button style={{marginBottom: "8px"}} type="dashed" block><Link
                    to="/account">Account</Link></Button>
                <Button type="dashed" key="6" onClick={() => {
                    userHasAuthenticated(false);
                    history.push("/")
                }} block>Log
                    out</Button>
            </>

        return (<Popover placement="bottomLeft" title={"DenPeshkov"} content={content}
                         trigger="click"><Avatar>D</Avatar></Popover>
        );
    }

    function UnauthenticatedLayout() {
        const [isDrawerVisible, setDrawerVisible] = useState(false);
        const history = useHistory();

        return (
            <>
                <Button key="5" onClick={() => setDrawerVisible(true)}
                        icon={<BarsOutlined style={{fontSize: "20px"}}/>}/>
                <Drawer
                    placement="right"
                    onClose={() => setDrawerVisible(false)}
                    visible={isDrawerVisible}
                    closable={false}
                >
                    <div>
                        <Button style={{marginBottom: "8px"}} type="dashed" block onClick={() => {
                            setDrawerVisible(false);
                        }}><Link
                            to="/signin">Sign in</Link></Button>
                        <Button type="dashed" key="6" onClick={() => {
                            userHasAuthenticated(false);
                            history.push("/");
                            setDrawerVisible(false);
                        }} block><Link to="/signup">Sign up</Link></Button>
                    </div>
                </Drawer>
            </>
        );
    }

    return (
        isAuthenticated ? <AuthenticatedLayout/> : <UnauthenticatedLayout/>
    );
}

export default MobileAppHeaderLayout;