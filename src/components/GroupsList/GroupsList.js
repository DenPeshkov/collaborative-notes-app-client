import React from 'react';
import "./GroupsList.css"
import {Button, Space, Table, Typography} from "antd";
import FolderOutlined from "@ant-design/icons/lib/icons/FolderOutlined";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";

const {Column} = Table;
const {Text} = Typography;


function GroupsList() {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 3,
            children: [
                {
                    key: '11',
                    name: 'Mike'
                }
            ]
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
    ];

    return (
        <Table
            showHeader={false}
            pagination={false}
            dataSource={dataSource}
        >
            <Column title="Name" dataIndex="name" key="name" render={(name, record) => (
                <Space>
                    <FolderOutlined/>
                    <Text style={{maxWidth: "128px"}} ellipsis={true}>{name}</Text>
                </Space>
            )}/>
            <Column render={() => (
                <Button type="default" size="small" danger={true} icon={<CloseOutlined/>}/>
            )}/>
        </Table>
    );
}

export default GroupsList;