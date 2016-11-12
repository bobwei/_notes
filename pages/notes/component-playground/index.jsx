/* eslint-disable no-eval, import/no-unresolved, import/extensions */
import React from 'react';
import DocumentTitle from 'react-document-title';
import compose from 'recompose/compose';
import setStatic from 'recompose/setStatic';

import CodePlayground from 'components/CodePlayground';

const Page = () => (
  <DocumentTitle title={Page.metadata().title}>
    <div>
      <h1>React Component Playground</h1>
      <p>
        This is a test for showcase of component play ground.
      </p>
      <CodePlayground />
    </div>
  </DocumentTitle>
);

const Comp = compose(
  setStatic(
    'metadata',
    () => {
      return {
        title: 'React Component Playground',
      };
    }
  )
)(Page);

export default Comp;
