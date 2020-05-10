import React from 'react';
import {Button, PageHeader} from "antd";
import "./AppHeader.css"
import {Link} from "react-router-dom";

function AppHeader() {
    return (
        <PageHeader
            className="app-header"
            title={<Link to="/" style={{color: "white"}}>ShareNotes</Link>}
            extra={[
                <Button ghost={true} key="1">Sign in</Button>,
                <Button ghost={true} key="2" type="primary">Sign up</Button>,
            ]}
            ghost={false}
        />
    );
}

export default AppHeader;