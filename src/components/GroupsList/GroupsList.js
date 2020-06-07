import React, {useContext, useEffect, useRef, useState} from 'react';
import "./GroupsList.css"
import {Button, Form, Input, Space, Table, Typography} from "antd";
import FolderOutlined from "@ant-design/icons/lib/icons/FolderOutlined";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";

const {Text} = Typography;

function GroupsList() {

    const EditableContext = React.createContext();

    const EditableRow = ({index, ...props}) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
                              title,
                              editable,
                              children,
                              dataIndex,
                              record,
                              handleSave,
                              ...restProps
                          }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef();
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async e => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({...record, ...values});
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const [columns, useColumns] = useState(
        [
            {
                title: 'name',
                dataIndex: 'name',
                editable: true,
                render: (text, record) => {
                    return record.parent_key === undefined ? <Space>
                            <FolderOutlined/>
                            <Text style={{maxWidth: "115px"}}
                                  ellipsis={true}>{text}</Text>
                        </Space>
                        :
                        <Text style={{maxWidth: "115px"}}
                              ellipsis={true}>{text}</Text>
                }
            },
            {
                title: 'delete',
                dataIndex: 'delete',
                align: "right",
                render: (text, record) => <Button type="default" size="small" danger={true} icon={<CloseOutlined/>}
                                                  onClick={() => handleDelete(record)}/>
            }
        ]
    );

    const [dataSource, setDatasource] = useState(
        [
            {
                key: '1',
                name: 'Mike',
                children: [
                    {
                        key: '3',
                        parent_key: '1',
                        name: 'Mike'
                    },
                    {
                        key: '4',
                        parent_key: '1',
                        name: 'Mike'
                    }
                ]
            },
            {
                key: '2',
                name: 'John',
            },
        ]
    );

    const handleDelete = item => {
        if (item.parent_key === undefined)
            setDatasource(dataSource => dataSource.filter(i => i.key !== item.key));
        else {

            setDatasource(dataSource => {
                const temp = [...dataSource];
                const index = temp.findIndex(i => i.key === item.parent_key);
                temp[index].children = temp[index].children.filter(i => i.key !== item.key);
                if (temp[index].children.length === 0)
                    temp[index].children = null;
                return temp;
            });
        }
    };

    const handleSave = row => {
        setDatasource(dataSource => {
            const newData = [...dataSource];

            if (row.parent_key === undefined) {
                const index = newData.findIndex(item => row.key === item.key);
                newData.splice(index, 1, row);
            } else {
                const index = newData.findIndex(item => row.parent_key === item.key);
                const item = newData[index].children;
                const index_ch = item.findIndex(i => i.key === row.key);
                newData[index].children.splice(index_ch, 1, row);
            }
            return newData;
        });
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columnsTable = columns.map(col => {
        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    return (
        <Table
            components={components}
            rowClassName={() => 'editable-row'}
            dataSource={dataSource}
            columns={columnsTable}
            showHeader={false}
            pagination={false}
        />
    );
}

export default GroupsList;