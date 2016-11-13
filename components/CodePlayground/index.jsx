/* eslint-disable import/no-unresolved, import/extensions */
import React from 'react';
import { curry } from 'lodash/function';
import { template } from 'lodash/string';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';

import { execute as run, defaultScope } from 'utils/code';
import codeTemplate from 'raw!./template';

import Editor from './editor';
import Preview from './preview';

const compiledTemplate = template(codeTemplate);
const curriedExecute = curry(run, 2);

const CodePlayground = ({
  code, execute,
  mountPointId,
  logs,
} = {}) => (
  <div>
    <Editor
      code={code}
      execute={execute}
    />
    <Preview
      mountPointId={mountPointId}
      logs={logs}
    />
  </div>
);

export default compose(
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
      code: compiledTemplate({ scope }),
    };
  }),
  lifecycle({
    componentDidMount() {
      const { execute, codeInitialValue } = this.props;
      execute(codeInitialValue);
    },
  }),
)(CodePlayground);
