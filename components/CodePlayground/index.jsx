/* eslint-disable no-eval, import/no-unresolved, import/extensions, global-require */
import React from 'react';
import Codemirror from 'react-codemirror';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { throttle, curry } from 'lodash/function';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';

import { execute as run } from 'utils/code';
import codeTemplate from 'raw!./template';
import styles from './index.module.scss';

if (canUseDOM) {
  require('codemirror/mode/javascript/javascript');
}

const CodePlayground = ({ codeInitialValue, codemirrorOptions, mountPointId, execute } = {}) => (
  <div>
    <Codemirror
      options={codemirrorOptions}
      value={codeInitialValue}
      onChange={throttle(execute, 1000)}
    />
    <div className={styles.preview}>
      <h3>
        Preview
      </h3>
      <div
        id={mountPointId}
        className={styles.component}
      />
    </div>
  </div>
);

export default compose(
  defaultProps({
    codeInitialValue: codeTemplate,
    codemirrorOptions: {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'solarized',
      tabSize: 2,
      autofocus: true,
    },
  }),
  withProps(() => {
    const mountPointId = String(Math.random());
    return {
      mountPointId,
      execute: curry(run, 2)({ mountPointId }),
    };
  }),
  lifecycle({
    componentDidMount() {
      const { execute, codeInitialValue } = this.props;
      execute(codeInitialValue);
    },
  }),
)(CodePlayground);
