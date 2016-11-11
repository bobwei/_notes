import React from 'react';
import DocumentTitle from 'react-document-title';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';

const Page = () => (
  <DocumentTitle title={Page.metadata().title}>
    <div>
      <h1>React Component Playground</h1>
      <p>
        This is a test for showcase of component play ground.
      </p>
      <div>
        <Codemirror
          options={{
            lineNumbers: true,
            mode: 'javascript',
            theme: 'solarized',
            tabSize: 2,
            autofocus: true,
          }}
          onChange={(code) => {
            console.log(code);
          }}
        />
      </div>
    </div>
  </DocumentTitle>
);

Page.metadata = () => {
  return {
    title: 'React Component Playground',
  };
};

export default Page;
