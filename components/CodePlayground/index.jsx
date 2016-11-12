/* eslint-disable no-eval, import/no-unresolved, import/extensions, global-require */
import React from 'react';
import Codemirror from 'react-codemirror';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import { throttle, curry } from 'lodash/function';
import { template } from 'lodash/string';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';

import { execute as run, defaultScope } from 'utils/code';
import codeTemplate from 'raw!./template';
import './codemirror.scss';
import Preview from './preview';

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
    <Preview
      mountPointId={mountPointId}
    />
  </div>
);

export default compose(
  defaultProps({
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
    const scope = {
      ...defaultScope,
      mountPointId,
    };
    return {
      mountPointId,
      execute: curry(run, 2)(scope),
      codeInitialValue: template(codeTemplate)({ scope }),
    };
  }),
  lifecycle({
    componentDidMount() {
      const { execute, codeInitialValue } = this.props;
      execute(codeInitialValue);
    },
  }),
)(CodePlayground);
