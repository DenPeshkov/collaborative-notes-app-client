import React, {useEffect, useState} from "react";
import "./Note.css";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import {get} from "../libs/get";
import {Card, Input} from "antd";

const {TextArea} = Input;

export default function Note() {
  const {id} = useParams();
  const history = useHistory();
  const [note, setNote] = useState({title: "title1", text: "text1"});

  const noteUrl = 'http://localhost:8762/notes-service/api/notes'

  /*useEffect(() => {
    function loadNote() {
      return get(`${noteUrl}/${id}`);
    }

    async function onLoad() {
      try {
        const note = await (await loadNote()).json();

        setNote(note);
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
      <Card className="Card" title="Title" bordered={false}
            extra={<a href="#">More</a>}>
        <TextArea bordered={false} placeholder="Note content..."
                  autoSize value={note.text} onChange={({target: {value}}) => {
          setNote(prevNote => ({...prevNote, text: value}))
        }}/>
      </Card>
  );
}