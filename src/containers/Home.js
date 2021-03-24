import React, {useEffect, useState} from "react";
import "./Home.css";
import {Button, Layout, List, Typography} from "antd";
import {useAppContext} from "../libs/contextLib";
import {Link, useHistory} from "react-router-dom";
import {get} from "../libs/get";

const {Content} = Layout;
const {Title} = Typography;

export default function Home() {
  const history = useHistory();
  const {isAuthenticated} = useAppContext();
  const [notes, setNotes] = useState([]);

  const notesUrl = 'http://localhost:8763/notes-service/api/notes'

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await get(notesUrl);
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

  function renderNotes() {
    return (
        <List
            className='notes-list'
            size="large"
            header={
              <div>
                <Button key="1" block className="add-note-button" type="dashed">
                  <Link to="/notes/new">
                    Create new note
                  </Link>
                </Button>
              </div>
            }
            dataSource={notes}
            renderItem={item => <List.Item>{item}</List.Item>}
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