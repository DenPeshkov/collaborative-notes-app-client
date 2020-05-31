import React from 'react';
import {Button, PageHeader} from "antd";
import {Link} from "react-router-dom";
import {useAppContext} from "../../libs/contextLib";
import "./AppHeader.css"

function AppHeader() {

    const {isAuthenticated, userHasAuthenticated} = useAppContext();
    let extra;

    switch (isAuthenticated) {
        case false: {
            extra = [
                <Button key="1"><Link to="/signin">Sign in</Link></Button>,
                <Button key="2" type="primary"><Link to="/signup">Sign up</Link></Button>,
            ];
            break;
        }
        case true: {
            extra = [<Button ghost={true} key="1" type="primary" onClick={() => userHasAuthenticated(false)}>Log
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