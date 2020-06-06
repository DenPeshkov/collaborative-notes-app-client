import React from 'react';
import {Card, List, Typography} from "antd";
import "./NotesList.css"

const {Text} = Typography;

function NotesList() {

    const data = [
        ['Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.'],
        ['Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.'],
    ];

    return (
        data.map((arr) => <List
            header={<p style={{fontWeight: "bold"}}>HEADER</p>}
            dataSource={arr}
            renderItem={item => (
                <List.Item>
                    <Card hoverable={true} bordered={false}>
                        <Text editable={true}>{item}</Text>
                    </Card>
                </List.Item>
            )}
            size="default"
        />)
    );
}

export default NotesList;