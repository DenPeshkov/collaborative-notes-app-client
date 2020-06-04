import React from 'react';
import {Col, Layout, Row} from "antd";
import "./AppHeader.css"

const {Header} = Layout;

function AppHeader(props) {

    return (
        <Header className="app-header">
            <Row justify="space-between">
                <Col>
                    {props.left}
                </Col>
                <Col>
                    {props.center}
                </Col>
                <Col>
                    {props.right}
                </Col>
            </Row>
        </Header>
    );
}

export default AppHeader;