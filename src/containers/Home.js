import React from "react";
import "./Home.css";
import {Layout, Typography} from "antd";

const {Content} = Layout;
const {Title} = Typography;

export default function Home() {
  return (
      <div className="Home">
        <Layout className="layout">
          <Content className="content">
            <Title>ShareNotes</Title>
            <Title level={2}>A simple collaborative note taking app</Title>
          </Content>
        </Layout>
      </div>
  );
}