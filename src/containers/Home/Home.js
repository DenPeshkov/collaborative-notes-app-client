import React from "react";
import "./Home.css";
import {Col, Row, Typography} from "antd";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import {useAppContext} from "../../libs/contextLib";
import MobileAppHeaderLayout from "../../components/AppHeader/MobileAppHeaderLayout";
import DefaultAppHeaderLayout from "../../components/AppHeader/DefaultAppHeaderLayout";

const {Title} = Typography;

export default function Home() {
    const {isMobile} = useAppContext();

    return (
        <div className="home">
            <AppHeader left={<Link to="/" style={{fontSize: "20px", fontWeight: 600}}>ShareNotes</Link>} right={
                isMobile ? <MobileAppHeaderLayout/> : <DefaultAppHeaderLayout/>
            }/>
        </div>
    );
}