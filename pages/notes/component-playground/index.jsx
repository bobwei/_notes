/* eslint-disable no-eval, import/no-unresolved, import/extensions, global-require */
import React from 'react';
import DocumentTitle from 'react-document-title';
import Codemirror from 'react-codemirror';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { throttle } from 'lodash/function';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import setStatic from 'recompose/setStatic';

import { execute } from 'utils/code';
import codeTemplate from 'raw!./template';
import styles from './index.module.scss';

if (canUseDOM) {
  require('codemirror/mode/javascript/javascript');
}

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
          value={codeTemplate}
          onChange={throttle(execute, 1000)}
        />
      </div>
      <div className={`${styles.previewComponent} mount-point`} />
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
  ),
  lifecycle({
    componentDidMount() {
      execute(codeTemplate);
    },
  }),
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
