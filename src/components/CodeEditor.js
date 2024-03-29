import React, { useRef } from 'react';
import CodeMirror from "react-codemirror";
import { Col } from "reactstrap";

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/theme/darcula.css';


const CodeEditor = ({ code, setCode, disabled }) => {
  const codeMirror = useRef();
  const editorOptions = {
    lineNumbers: true,
    theme: 'darcula',
  };

  return (
    <>
      <Col md={12} sm={12}>
        <CodeMirror
          className={`code-editor ${disabled ? "disabled-editor" : ""}`}
          ref={codeMirror}
          value={code}
          onChange={setCode}
          options={editorOptions}
        />
      </Col>
    </>
  );

}

export { CodeEditor };
