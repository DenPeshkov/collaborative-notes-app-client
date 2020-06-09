import React, {useContext, useEffect, useRef, useState} from 'react';
import "./GroupsList.css"
import {Button, Form, Input, Space, Table, Typography} from "antd";
import FolderOutlined from "@ant-design/icons/lib/icons/FolderOutlined";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

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
                render: (text, record) => {
                    return record.parent_key === undefined ?
                        <Space>
                            <Button type="default" size="small" icon={<PlusOutlined/>}
                                    onClick={() => setDatasource(dataSource => {
                                        const newData = [...dataSource.data];

                                        let index = newData.findIndex(i => i.key === record.key);
                                        newData[index].children = newData[index].children === undefined ? [{
                                                key: dataSource.count + 1,
                                                name: "Новая заметка",
                                                parent_key: index
                                            }]
                                            :
                                            [...newData[index].children, {
                                                key: dataSource.count + 1,
                                                name: "Новая заметка",
                                                parent_key: index
                                            }];
                                        return {
                                            data: newData,
                                            count: dataSource.count + 1
                                        };
                                    })}/>
                            <Button type="default" size="small" danger={true} icon={<CloseOutlined/>}
                                    onClick={() => handleDelete(record)}/>
                        </Space>
                        :
                        <Button type="default" size="small" danger={true} icon={<CloseOutlined/>}
                                onClick={() => handleDelete(record)}/>
                }
            }
        ]
    );

    const [dataSource, setDatasource] = useState(
        {
            data: [
                {
                    key: 0,
                    name: 'Mike',
                    children: [
                        {
                            key: 2,
                            parent_key: 0,
                            name: 'Mike'
                        },
                        {
                            key: 3,
                            parent_key: 0,
                            name: 'Mike'
                        }
                    ]
                },
                {
                    key: 1,
                    name: 'John',
                },
            ],
            count: 4
        }
    );

    const handleDelete = item => {
        if (item.parent_key === undefined)
            setDatasource(dataSource => {
                return {data: dataSource.data.filter(i => i.key !== item.key), count: dataSource.count - 1}
            });
        else
            setDatasource(dataSource => {
                const temp = [...dataSource.data];
                const index = temp.findIndex(i => i.key === item.parent_key);
                temp[index].children = temp[index].children.filter(i => i.key !== item.key);
                if (temp[index].children.length === 0)
                    temp[index].children = null;
                return {data: temp, count: dataSource.count - 1};
            });
    };

    const handleSave = row => {
        setDatasource(dataSource => {
            const newData = [...dataSource.data];

            if (row.parent_key === undefined) {
                const index = newData.findIndex(item => row.key === item.key);
                newData.splice(index, 1, row);
            } else {
                const index = newData.findIndex(item => row.parent_key === item.key);
                const item = newData[index].children;
                const index_ch = item.findIndex(i => i.key === row.key);
                newData[index].children.splice(index_ch, 1, row);
            }
            return {data: newData, count: dataSource.count};
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
            dataSource={dataSource.data}
            columns={columnsTable}
            showHeader={false}
            pagination={false}
            title={() =>
                <Button type="default" size="small" icon={<PlusOutlined/>} onClick={() => setDatasource(dataSource => {
                    return {
                        data: [...dataSource.data, {key: dataSource.count + 1, name: "Новая группа"}],
                        count: dataSource.count + 1
                    };
                })}/>
            }
        />
    );
}

export default GroupsList;