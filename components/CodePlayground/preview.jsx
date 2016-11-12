import React from 'react';

import styles from './index.module.scss';

const Preview = ({ mountPointId, logs }) => (
  <div className={styles.preview}>
    <h4>
      Console.log
    </h4>
    <div
      id={`${mountPointId}:console.log`}
      className={styles.component}
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
      className={styles.component}
    />
  </div>
);

Preview.propTypes = {
  mountPointId: React.PropTypes.string,
  logs: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default Preview;
