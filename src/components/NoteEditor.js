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
  const [automergeDoc, setAutomergeDoc] = useState(Automerge.load(
      "[\"~#iL\",[[\"~#iM\",[\"ops\",[\"^0\",[[\"^1\",[\"action\",\"makeText\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"_head\",\"elem\",1]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:1\",\"value\",\"S\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:1\",\"elem\",2]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:2\",\"value\",\"o\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:2\",\"elem\",3]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:3\",\"value\",\"m\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:3\",\"elem\",4]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:4\",\"value\",\"e\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:4\",\"elem\",5]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:5\",\"value\",\" \"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:5\",\"elem\",6]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:6\",\"value\",\"t\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:6\",\"elem\",7]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:7\",\"value\",\"e\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:7\",\"elem\",8]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:8\",\"value\",\"x\"]],[\"^1\",[\"action\",\"ins\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:8\",\"elem\",9]],[\"^1\",[\"action\",\"set\",\"obj\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\",\"key\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93:9\",\"value\",\"t\"]],[\"^1\",[\"action\",\"link\",\"obj\",\"00000000-0000-0000-0000-000000000000\",\"key\",\"text\",\"value\",\"8bdacb8c-a635-4792-9a42-527a20a2ff31\"]]]],\"actor\",\"888443d3-4ff0-44b8-8eae-72bb0b5dfd93\",\"seq\",1,\"deps\",[\"^1\",[]],\"message\",\"Initialization\",\"undoable\",false]]]]"));

  const [note, setNote] = useState("Some text");
  const history = useHistory();

  const url = 'http://localhost:8762/notes-service'

  const ws = useRef(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const note = await (await fetchRequest(`${url}/api/notes/${props.id}`,
            null,
            'GET')).json();

        props.setTitle(note.title);
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

  /*useEffect(() => {
    console.log("automergeDoc: " + automergeDoc.text.toString())
    setNote(automergeDoc.text.toString());
  }, [automergeDoc.text])*/

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