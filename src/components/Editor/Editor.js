import React, {useMemo, useState} from 'react';
import "./Editor.css"
import {createEditor} from 'slate'
import {Editable, Slate, withReact} from 'slate-react'

function Editor() {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        }
    ])

    return (
        <Slate editor={editor} value={value} onChange={newValue => {
            setValue(newValue);
        }}>
            <Editable/>
        </Slate>
    );
}

export default Editor;