/* eslint-disable import/no-unresolved, import/extensions */
import React from 'react';
import { curry } from 'lodash/function';
import { template } from 'lodash/string';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';

import { execute as run, defaultScope } from 'utils/code';
import codeTemplate from 'raw!./template';

import Editor from './editor';
import Preview from './preview';

const compiledTemplate = template(codeTemplate);
const curriedExecute = curry(run, 2);

const CodePlayground = ({
  codeInitialValue, codemirrorOptions, mountPointId, execute, logs,
} = {}) => (
  <div>
    <Editor
      codeInitialValue={codeInitialValue}
      codemirrorOptions={codemirrorOptions}
      execute={execute}
    />
    <Preview
      mountPointId={mountPointId}
      logs={logs}
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
  withProps(() => ({
    mountPointId: String(Math.random()),
  })),
  withState('logs', 'setLogs', []),
  withProps(({ setLogs, mountPointId }) => {
    const scope = {
      ...defaultScope,
      mountPointId,
      console: {
        log(...args) {
          setLogs(logs => [...logs, args.map(arg => String(arg)).join(' ')]);
        },
      },
    };
    return {
      mountPointId,
      execute: curriedExecute(scope),
      codeInitialValue: compiledTemplate({ scope }),
    };
  }),
  lifecycle({
    componentDidMount() {
      const { execute, codeInitialValue } = this.props;
      execute(codeInitialValue);
    },
  }),
)(CodePlayground);
