import React, { memo } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import * as echarts from 'echarts';
import {useDOMMounted} from '@/utils/hooks';

interface IProps {
  className?: string;
}

export default memo<IProps>(function ColumnChart(props) {
  const { className } = props;
  function RenderChart() {
    const data = {
      tuli1: [10,20,30,40],
      tuli2: [10,20,30,40],
      tuli3: [10,20,30,40],
      tuli4: [10,20,30,40],
    }
    const date = [1,2,3,4,5,6]
    const option: echarts.EChartsCoreOption = {
      tooltip: {
        trigger: 'item',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      dataZoom: [
        {
          show: (date?.length || 1) > 4,
          realtime: true,
          start: 0,
          end: 1 / ((date.length || 1) / 4) * 100,
          zoomOnMouseWheel: false,
        },
      ],
      legend: {
        data: ['图例1', '图例2', '图例3', '图例4'],
        left: '0%',
        top: '5%',
        textStyle: {
          color: "#666666"
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 25
      },
      xAxis: {
        type: 'category',
        data: date,
        axisLine: {
          lineStyle: {
            color: '#cdd5e2'
          }
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#666666"
          }
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#cdd5e2'
          }
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#666666"
          }
        },
      },
      series: [
        {
          name: '图例1',
          type: 'bar',
          barWidth: '12px',
          data: data.tuli1,
          itemStyle: {
            normal: {
              color: '#24adfe',
            }
          }
        },
        {
          name: '图例2',
          type: 'bar',
          barWidth: '12px',
          data: data.tuli2,
          itemStyle: {
            normal: {
              color: '#8cbd41',
            }
          }
        },
        {
          name: '图例3',
          type: 'bar',
          barWidth: '12px',
          data: data.tuli3,
          itemStyle: {
            normal: {
              color: '#f3965b',
            }
          }
        },
        {
          name: '图例4',
          type: 'bar',
          barWidth: '12px',
          data: data.tuli4,
          itemStyle: {
            normal: {
              color: '#df6ae7',
            }
          }
        }
      ]
    };

    const [echartsMounted] = useDOMMounted<HTMLDivElement>(div => {
      const chart = echarts.init(div);
      function onResize() {
        chart.resize();
      }
      chart.setOption(option);
      window.addEventListener('resize', onResize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', onResize);
      }
    });

    return <div ref={echartsMounted} style={{ width: '100%', height: '320px' }} ></div>
  }
  return <div className={classnames(styles.box, className)}>
    <RenderChart></RenderChart>
  </div>
})
