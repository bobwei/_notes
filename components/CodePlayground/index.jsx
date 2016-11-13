/* eslint-disable import/no-unresolved, import/extensions, jsx-a11y/label-has-for */
import React from 'react';
import { curry } from 'lodash/function';
import { template } from 'lodash/string';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';

import { execute as run, defaultScope } from 'utils/code';
import codeTemplate from 'raw!./template';

import styles from './index.module.scss';
import Editor from './editor';
import Preview from './preview';

const compiledTemplate = template(codeTemplate);
const curriedExecute = curry(run, 2);

const CodePlayground = ({
  code, onCodeChange,
  enableLivePreview, toggleLivePreview,
  mountPointId,
  logs,
} = {}) => (
  <div>
    <Editor
      code={code}
      onCodeChange={onCodeChange}
    />
    <div className={styles.options}>
      <label>
        <input type="checkbox" checked={enableLivePreview} onChange={toggleLivePreview} />
        live preview
      </label>
    </div>
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
  withState('enableLivePreview', 'updateEnableLivePreview', false),
  withProps(({ updateEnableLivePreview }) => ({
    toggleLivePreview: () => updateEnableLivePreview(n => !n),
  })),
  withState('code', 'setCode', ({ code }) => code),
  withProps(({ execute, setCode, enableLivePreview, code, toggleLivePreview }) => ({
    onCodeChange(val) {
      setCode(val);
      if (enableLivePreview) {
        execute(val);
      }
    },
    toggleLivePreview() {
      const nextNnableLivePreview = !enableLivePreview;
      if (nextNnableLivePreview) {
        execute(code);
      }
      toggleLivePreview();
    },
  })),
  lifecycle({
    componentDidMount() {
      const { execute, code } = this.props;
      execute(code);
    },
  }),
)(CodePlayground);
