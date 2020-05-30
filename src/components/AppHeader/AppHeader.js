import React from 'react';
import {Button, PageHeader} from "antd";
import {Link} from "react-router-dom";

function AppHeader() {
    return (
        <PageHeader
            className="app-header"
            title={<Link to="/">ShareNotes</Link>}
            extra={[
                <Button ghost={true} key="1"><Link to="/signin">Sign in</Link></Button>,
                <Button ghost={true} key="2" type="primary"><Link to="/signup">Sign up</Link></Button>,
            ]}
            ghost={false}
        />
    );
}

export default AppHeader;