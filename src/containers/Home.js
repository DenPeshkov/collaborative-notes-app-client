import React, {useEffect, useState} from "react";
import "./Home.css";
import {Button, Layout, List, Typography} from "antd";
import {useAppContext} from "../libs/contextLib";
import {Link, useHistory} from "react-router-dom";
import {get} from "../libs/get";
import {FileAddOutlined, SnippetsOutlined} from "@ant-design/icons";

const {Content} = Layout;
const {Title} = Typography;

export default function Home() {
  const history = useHistory();
  const {isAuthenticated} = useAppContext();
  const [notes, setNotes] = useState([]);

  const notesUrl = 'http://localhost:8762/notes-service/api/notes'

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await (await get(notesUrl)).json();

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

  function createNote() {

  }

  function renderNotes() {
    return (
        <List
            className='notes-list'
            size="large"
            header={
              <div>
                <Button key="1" className="add-note-button" type="text"
                        icon={<FileAddOutlined/>} onCLick={createNote}>
                  Create new note
                </Button>
              </div>
            }
            dataSource={notes}
            renderItem={item =>
                <List.Item>
                  <List.Item.Meta
                      avatar={<SnippetsOutlined/>}
                      title={<Link to={`/notes/${item.id}`}>{item.title}</Link>}
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