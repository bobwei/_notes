import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import styles from './index.module.scss';

const Preview = ({ mountPointId, logs }) => (
  <div className={styles.preview}>
    <h4>
      Console.log
    </h4>
    <div
      id={`${mountPointId}:console.log`}
      className={`${styles.displayBlock} ${styles.logs}`}
    >
      {logs.map((log, i) => (
        <span key={i}>
          {log}
          <br />
        </span>
      ))}
    </div>
    <h4>
      Preview
    </h4>
    <div
      id={mountPointId}
      className={styles.displayBlock}
    />
  </div>
);

Preview.propTypes = {
  mountPointId: React.PropTypes.string,
  logs: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default compose(
  lifecycle({
    componentDidUpdate() {
      const { mountPointId } = this.props;
      const dom = document.getElementById(`${mountPointId}:console.log`);
      dom.scrollTop = dom.scrollHeight;
    },
  })
)(Preview);
