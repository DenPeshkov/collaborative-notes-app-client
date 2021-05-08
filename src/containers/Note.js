import React, {useEffect, useState} from "react";
import "./Note.css";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import {Button, Card, Input, Spin} from "antd";
import NoteEditor from "../components/NoteEditor";
import {fetchRequest} from "../libs/fetchRequest";
import {FileAddOutlined} from "@ant-design/icons";

const {TextArea} = Input;

export default function Note() {
  const {id} = useParams();
  //const history = useHistory();
  //const [note, setNote] = useState({title: "", text: ""});

  //const url = 'http://localhost:8762/notes-service'

  //const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");

  /*useEffect(() => {
    async function onLoad() {
      try {
        const note = await (await fetchRequest(`${url}/api/notes/${id}`, null,
            'GET')).json();

        setNote(note);
        setLoading(false);
      } catch (exception) {
        console.log(exception)

        history.push("/error", {
          status: exception.status,
          exception: exception.exception
        })
      }
    }

    onLoad();
  }, [id]);*/

  return (
      /*loading ?
          <Spin className="spin-loading" tip="Loading..." size="large"/>
          :
          <Card className="Card" title={note.title}
                bordered={false}
                extra={<a href="#">More</a>}>
            {loading ? <Spin/> : <NoteEditor text={note.text}/>}
          </Card>*/
      <Card className="Card" title={title}
            bordered={false}
            extra={<Button type="text" onClick={saveNote}>
              Save
            </Button>}>
        <NoteEditor id={id} setTitle={setTitle}/>
      </Card>
  );

}