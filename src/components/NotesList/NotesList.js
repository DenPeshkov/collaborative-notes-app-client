import React, {useContext, useEffect, useRef, useState} from 'react';
import "./NotesList.css"
import {Button, Form, Input, Space, Table, Tooltip, Typography} from "antd";
import FileAddOutlined from "@ant-design/icons/lib/icons/FileAddOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import FileTextOutlined from "@ant-design/icons/lib/icons/FileTextOutlined";

const {Text} = Typography;
const {Search} = Input;

function NotesList(props) {

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
                render: text => {
                    return <Space>
                        <FileTextOutlined/>
                        <Tooltip placement="topLeft" title={text}>
                            <Text style={{maxWidth: "120px"}} ellipsis={true}>{text}</Text>
                        </Tooltip>
                    </Space>
                }
            },
            {
                title: 'delete',
                dataIndex: 'delete',
                align: "right",
                render: (text, record) => {
                    return <Button icon={<DeleteOutlined/>} onClick={() => handleDelete(record.key)} size="middle"
                                   style={{border: "none"}}/>;
                }
            }
        ]
    );

    const [dataSource, setDatasource] = useState(
        [
            {
                key: 0,
                name: 'Mike',
            },
            {
                key: 1,
                name: 'John',
            },
        ]
    );

    const handleDelete = key => {
        setDatasource(dataSource => dataSource.filter(note => note.key !== key));
    };

    const handleSave = row => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDatasource(newData);
    };

    const handleAdd = () => {
        setDatasource(dataSource => [...dataSource, {key: dataSource.length + 1, name: "Новая заметка"}])
    }

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
            dataSource={dataSource.filter(note => props.search === "" ? note : note.name.startsWith(props.search))}
            columns={columnsTable}
            showHeader={false}
            pagination={false}
            title={() => <Button icon={<FileAddOutlined/>} size="large" type="dashed" block onClick={() => handleAdd()}>Add
                note</Button>
            }
        />
    );
}

export default NotesList;