import React, {useMemo, useState} from "react";
import {Divider, Input} from "antd";
import "./NoteEditor.css"
import * as Automerge from "automerge";

const {TextArea} = Input;

export default function NoteEditor(props) {
  const [automergeNote, setAutomergeNote] = useState(
      Automerge.from({text: new Automerge.Text(props.text)}));

  //TODO Не работает если выделять текст и изменять, например, удалить участок текста
  const onKeyDown = (event) => {
    const cursor = event.target.selectionStart;

    console.log('cursor=' + cursor)
    console.log('key=' + event.key)

    let newAutomergeNote;

    switch (event.key) {
      case 'Enter': {
        setAutomergeNote(
            newAutomergeNote = Automerge.change(automergeNote,
                automergeNote => {
                  automergeNote.text.insertAt(cursor, '\n')
                })
        )
        break
      }
      case 'Delete': {
        setAutomergeNote(
            newAutomergeNote = Automerge.change(automergeNote,
                automergeNote => {
                  automergeNote.text.deleteAt(cursor)
                })
        )
        break
      }
      case 'Backspace': {
        setAutomergeNote(
            newAutomergeNote = Automerge.change(automergeNote,
                automergeNote => {
                  automergeNote.text.deleteAt(cursor - 1)
                })
        )
        break
      }
      default: {
        setAutomergeNote(
            newAutomergeNote = Automerge.change(automergeNote,
                automergeNote => {
                  automergeNote.text.insertAt(cursor, event.key)
                })
        )
        break
      }
    }

    console.log('automerge text=' + newAutomergeNote.text)
  }

  return (
      <TextArea defaultValue={props.text}
                autoSize
                onKeyDown={onKeyDown}
      />
  )
}