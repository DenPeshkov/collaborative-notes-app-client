import React, {useMemo, useState} from 'react';
import "./Editor.css"
import {createEditor} from "slate"
import {Slate, withReact} from "slate-react"

function Editor() {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([]);

    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}/>
    );
}

export default Editor;