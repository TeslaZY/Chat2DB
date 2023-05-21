import React, { memo } from 'react';
import styles from './index.less';
import ColumnChart from '../../chart/ColumnChart/index';

export default function ChartPage(){
  return <div className={styles.page}>
    <ColumnChart></ColumnChart>
  </div>
}