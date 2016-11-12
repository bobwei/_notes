/* eslint-disable no-eval, import/no-unresolved, import/extensions, global-require */
import React from 'react';
import Codemirror from 'react-codemirror';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { throttle } from 'lodash/function';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import defaultProps from 'recompose/defaultProps';

import { execute } from 'utils/code';
import codeTemplate from 'raw!./template';
import styles from './index.module.scss';

if (canUseDOM) {
  require('codemirror/mode/javascript/javascript');
}

const CodePlayground = ({ codeInitialValue, codemirrorOptions } = {}) => (
  <div>
    <Codemirror
      options={codemirrorOptions}
      value={codeInitialValue}
      onChange={throttle(execute, 1000)}
    />
    <div className={`${styles.previewComponent} mount-point`} />
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
  lifecycle({
    componentDidMount() {
      const { codeInitialValue } = this.props;
      execute(codeInitialValue);
    },
  })
)(CodePlayground);
