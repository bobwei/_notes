/* eslint-disable */
import React from 'react';
import DocumentTitle from 'react-document-title';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';

class Page extends React.Component {
  constructor() {
    super();
    this.state = { code: '' };
    this.updateCode = this.updateCode.bind(this);
  }

  static metadata() {
    return {
      title: 'React Component Playground',
    };
  }

  updateCode(code) {
    this.setState({ code });
  }

  render() {
    const { code } = this.state;
    return (
      <DocumentTitle title={Page.metadata().title}>
        <div>
          <h1>React Component Playground</h1>
          <p>
            This is a test for showcase of component play ground.
          </p>
          <div>
            <Codemirror
              value={code}
              onChange={this.updateCode}
              options={{
                lineNumbers: true,
                mode: 'javascript',
                theme: 'solarized',
              }}
            />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Page;
