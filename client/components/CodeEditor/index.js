import React, { Component } from 'react';
import LanguageDropdown from './Language_Dropdown';
import EditorField from './Code_Editor';


class CodeEditorParent extends Component {
  state = {
    currentLanguage: 'javascript'
  };

whatIsOurState(propVal) {
  this.setState({ currentLanguage: propVal });
}
handleCopy() {
        // const data = document.querySelectorAll('.view-lines .view-line span').forEach((elem) => {
        //     elem.innerText;
        // });
    const element = document.querySelector('.e594d483 h2').innerText;
    element.select();
        // console.log(element);
        document.execCommand('Copy');
}
render() {
  return (
    <div  style={{marginTop: '3%', paddingBottom: '10%'}}>
    <LanguageDropdown handleParentStateChange={this.whatIsOurState.bind(this)} />


      <EditorField currentLanguageState={this.state.currentLanguage} />
    </div>
  );
}
}

export default CodeEditorParent;
