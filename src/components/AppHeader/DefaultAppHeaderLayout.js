import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {Avatar, Button, Popover} from "antd";
import {useAppContext} from "../../libs/contextLib";

function DefaultAppHeaderLayout() {
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
        return (
            <>
                <Button key="3" style={{marginRight: "8px"}}><Link to="/signin">Sign in</Link></Button>
                <Button key="4" type="primary"><Link to="/signup">Sign up</Link></Button>
            </>
        );
    }

    return (isAuthenticated ? <AuthenticatedLayout/> : <UnauthenticatedLayout/>);
}

export default DefaultAppHeaderLayout;