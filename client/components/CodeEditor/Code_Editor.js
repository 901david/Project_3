import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';

class CodeEditor extends Component {
  constructor(props) {
  super(props);
  this.state = {
    code: '// type your code...',
      fileName: '',
  }
}
editorDidMount(editor, monaco) {
  const retrievedObject = localStorage.getItem('CodeEditorPreviousState');
  const previousCode = JSON.parse(retrievedObject);
  this.setState({ code: previousCode })
  editor.focus();
}
onChange(newValue, e) {
  function localStore (state) {
    localStorage.setItem('CodeEditorPreviousState', JSON.stringify(state));

};
  const currentState = this.state;
  this.setState({ ...currentState, code: newValue});
  localStore(newValue);
}
handleDownload() {
      const code = this.state.code;
      const path = this.state.fileName;
    axios.post('http://localhost:3000/api/github/save', { code, path }).then((res) => {
       console.log(res);
    });
}
fileNameChange(event) {
      const currentState = this.state;
      this.setState({ ...currentState, fileName: event.target.value });
}
render() {
  const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        vs: 'http://localhost:8080/dist/vs',
      },
    };
  const code = this.state.code;
  const options = {
    selectOnLineNumbers: true
  };

  return (
    <div id='editor-text'>

        <div className='row'>

            <CopyToClipboard text={code}>
            <i className="fa fa-clipboard fa-3x" aria-hidden="true"></i>
        </CopyToClipboard>
            {/*<input onChange={(event) => this.fileNameChange(event)} value={this.state.fileName} id='filePath' type='text' />*/}
            {/*<i onClick={this.handleDownload.bind(this)} className="fa fa-download fa-3x" aria-hidden="true"></i>*/}

        </div>
        <div className='row'>
      <MonacoEditor
        width="100%"
        height="600"
        language={this.props.currentLanguageState}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={::this.onChange}
        editorDidMount={::this.editorDidMount}
        requireConfig={requireConfig}
      />
        </div>
    </div>
  );
}
}

export default CodeEditor;
