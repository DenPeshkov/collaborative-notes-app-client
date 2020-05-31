import React from 'react';
import "./Editor.css"
import {Input, Layout, List, Space} from "antd";
import {CalendarOutlined} from "@ant-design/icons";

const {Header, Footer, Sider, Content} = Layout;
const {TextArea} = Input;

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function Editor() {

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <IconText icon={CalendarOutlined} text="12.04.2017" key="1"/>,
                            ]}
                            onClick={() => console.log("a")}
                        >
                            {item.title}
                        </List.Item>
                    )}
                />
            </Sider>
            <Layout>
                <Content style={{margin: '24px 16px 0'}}>
                    <TextArea rows={4}/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Editor;