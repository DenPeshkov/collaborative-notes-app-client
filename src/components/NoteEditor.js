import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Divider, Input} from "antd";
import "./NoteEditor.css"
import * as Automerge from "automerge";
import useWebSocket from "react-use-websocket";
import {fetchRequest} from "../libs/fetchRequest";
import {useHistory} from "react-router-dom";
import {Client, Message} from '@stomp/stompjs';

const {TextArea} = Input;

export default function NoteEditor(props) {
  const [automergeDoc, setAutomergeDoc] = useState(
      Automerge.from({text: new Automerge.Text("")}));

  const [note, setNote] = useState("");
  const history = useHistory();

  const url = 'http://localhost:8762/notes-service'

  const ws = useRef(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const note = await (await fetchRequest(`${url}/api/notes/${props.id}`,
            null,
            'GET')).json();

        console.log("Got note from server: " + JSON.stringify(note));

        props.setTitle(note.title);
        setNote(note.text);
        console.log(Automerge.save(automergeDoc));
        if (note.automerge) {
          console.log("Setting automerge to value: " + note.automerge)
          setAutomergeDoc(Automerge.load(note.automerge));
        }
      } catch (exception) {
        console.log(exception)

        history.push("/error", {
          status: exception.status,
          exception: exception.exception
        })
      }
    }

    onLoad();
  }, [props.id]);

  const onReceiveMessage = message => {
    console.log("message from server: " + message);

    let changes = JSON.parse(message.body);
    console.log(
        "Received from automerge-service: " + JSON.stringify(changes));
    console.log("Received message actorId: " + changes[0].actor)

    if (Automerge.getActorId(automergeDoc) !== changes[0].actor) {
      setAutomergeDoc(prevDoc => {
        let newDoc = Automerge.applyChanges(prevDoc, changes)
        setNote(newDoc.text.toString());
        return newDoc;
      });
    }
  };

  useEffect(() => {
    ws.current = new Client();
    ws.current.brokerURL = 'ws://localhost:8754/handler';

    ws.current.onStompError = frame => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    ws.current.onWebSocketClose = event => {
      if (event.wasClean) {
        console.log(
            `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        console.log('[close] Соединение прервано');
      }
    }

    ws.current.activate();

    ws.current.onConnect = () => {
      console.log("[open] Соединение установлено");

      let subscription = ws.current.subscribe(`/topic/automerge/${props.id}`,
          onReceiveMessage);

      console.log("subscription.id: " + subscription.id)
    }

    return () => {
      ws.current.deactivate();
    };
  }, [])

  //TODO Не работает если выделять текст и изменять, например, удалить участок текста
  const onKeyDown = (event) => {
    const cursor = event.target.selectionStart;

    console.log('cursor=' + cursor)
    console.log('key=' + event.key)

    let newAutomergeNote;

    switch (event.key) {
      case 'Enter': {
        newAutomergeNote = Automerge.change(automergeDoc, 'Add new line',
            automergeNote => {
              automergeNote.text.insertAt(cursor, '\n')
            })
        break
      }
      case 'Delete': {
        newAutomergeNote = Automerge.change(automergeDoc,
            'Delete symbol (Delete)',
            automergeNote => {
              if (cursor >= 0 && cursor < automergeNote.text.length) {
                automergeNote.text.deleteAt(cursor)
              }
            })
        break
      }
      case 'Backspace': {
        newAutomergeNote = Automerge.change(automergeDoc,
            'Delete symbol (Backspace)',
            automergeNote => {
              if (cursor >= 1 && cursor <= automergeNote.text.length) {
                automergeNote.text.deleteAt(cursor - 1)
              }
            })
        break
      }
      case 'Shift':
        break
      case 'Alt':
        break
      case 'Control':
        break
      default: {
        newAutomergeNote = Automerge.change(automergeDoc, 'Add symbol',
            automergeNote => {
              automergeNote.text.insertAt(cursor, event.key)
            })
        break
      }
    }

    if (newAutomergeNote) {
      console.log('automerge text=' + newAutomergeNote.text)

      let changes = Automerge.getChanges(automergeDoc, newAutomergeNote)

      console.log("Sent to automerge-service: " + JSON.stringify(changes));

      ws.current.publish(
          {destination: `/websock/${props.id}`, body: JSON.stringify(changes)});

      setAutomergeDoc(newAutomergeNote);
    }
  }

  const onChange = event => {
    setNote(event.target.value);
  }

  return (
      <TextArea
          value={note}
          bordered={false}
          autoSize
          onKeyDown={onKeyDown}
          onChange={onChange}
      />
  )
}