import React, {useEffect, useState} from "react";
import "./Home.css";
import {Button, Input, Layout, List, Typography} from "antd";
import {useAppContext} from "../libs/contextLib";
import {Link, useHistory} from "react-router-dom";
import {FileAddOutlined, SnippetsOutlined} from "@ant-design/icons";
import {fetchRequest} from "../libs/fetchRequest";

const {Content} = Layout;
const {Title} = Typography;

export default function Home() {
  const history = useHistory();
  const {isAuthenticated} = useAppContext();
  const [notes, setNotes] = useState([]);

  const url = 'http://localhost:8762/notes-service'

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await (await fetchRequest(`${url}/api/notes`, null,
            'GET')).json();

        console.log('notes=' + notes);

        setNotes(notes);
      } catch (exception) {
        console.log(exception)

        history.push("/error", {
          status: exception.status,
          exception: exception.exception
        })
      }
    }

    onLoad();
  }, [isAuthenticated]);

  function renderLander() {
    return (
        <div className='lander'>
          <Title>ShareNotes</Title>
          <Title level={2}>A simple collaborative note taking app</Title>
        </div>
    );
  }

  async function createNote() {
    console.log("Create new note")
    const id = await (await fetchRequest(`${url}/api/notes`, {title: ""},
        'POST')).json();
    setNotes(notes => [...notes, {id: id, title: ""}])
  }

  async function editNote(e, item_id) {
    const {value} = e.target;
    console.log(value)
    const newNotes = [...notes] //copy the array
    const id = newNotes.findIndex(item => item.id === item_id);
    console.log("id inside editNote " + id);
    newNotes[id].title = value;
    setNotes(newNotes);
  }

  async function saveNote(item) {
    console.log("Saved note " + JSON.stringify(item))

    try {
      await fetchRequest(`${url}/api/notes/${item.id}`, item,
          'PUT')
    } catch (exception) {
      console.log(exception)

      history.push("/error", {
        status: exception.status,
        exception: exception.exception
      })
    }
  }

  async function deleteNote(id) {
    console.log("Deleted note " + id)

    try {
      await fetchRequest(`${url}/api/notes/${id}`, null,
          'DELETE')
    } catch (exception) {
      console.log(exception)

      history.push("/error", {
        status: exception.status,
        exception: exception.exception
      })
    }

    console.log("id to be deleted=" + id)
    console.log("notes after deletion=" + notes.filter(item => item.id !== id))
    setNotes(notes => notes.filter(item => item.id !== id));
  }

  function renderNotes() {
    return (
        <List
            className='notes-list'
            size="large"
            header={
              <div>
                <Button key="1" className="add-note-button" type="text"
                        icon={<FileAddOutlined/>} onClick={createNote}>
                  Create new note
                </Button>
              </div>
            }
            dataSource={notes}
            renderItem={item =>
                <List.Item
                    actions={[
                      <Button key="3">
                        <Link to={`/notes/${item.id}`}>
                          Open
                        </Link>
                      </Button>,
                      <Button key="2"
                              onClick={() => deleteNote(item.id)}>
                        Delete
                      </Button>]}>
                  <List.Item.Meta
                      title={<Input bordered={false}
                                    value={item.title}
                                    placeholder="Note's title"
                                    onChange={e => editNote(e, item.id)}
                                    onPressEnter={() => saveNote(item)}/>}
                  />
                </List.Item>}
        />
    )
  }

  return (
      <div className="Home">
        <Layout className="layout">
          <Content className="content">
            {isAuthenticated ? renderNotes() : renderLander()}
          </Content>
        </Layout>
      </div>
  );
}