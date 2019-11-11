import React, {Component} from 'react';
import CodeMirror from "react-codemirror";
import Col from "reactstrap/es/Col";

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/theme/darcula.css';


class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.getInitialState = this.getInitialState.bind(this);
    this.updateCode = this.updateCode.bind(this);

    this.editorOptions = {rm
      lineNumbers: true
    };

    this.state = {
      code: "<html><head></head><body></body></html>"
    };

    this.codeMirror = React.createRef();
  }


  getInitialState() {
    return {
      code: "// Code",
    };
  }

  updateCode(newCode) {
    this.setState({
      code: newCode,
    });
  }

  render() {
    return (
      <>
        <Col md={12} sm={12}>
          <CodeMirror
            ref={this.codeMirror}
            value={this.state.code}
            onChange={this.updateCode}
            options={this.editorOptions}
          />
        </Col>
      </>
    );
  }
}

export default CodeEditor;
