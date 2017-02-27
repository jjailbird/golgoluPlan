import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

const getMonth2YearString = (month) => {
  const yearString = (month > 24) ? `~${month / 12}세` : `~${month}개월`;
  return yearString;
};

export default class StandardGrowthChart extends Component {
  /*
  componentWillMount() {
    // const data = ;
    console.log('componentWillMount', this.props.data);
  }
  componentDidMount() {
    console.log('componentDidMount', this.props.data);
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps', this.props.data);
  }
  */
  getOption(jsonData1, jsonData2) {
    const option = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [],
      },
      toolbox: {
        feature: {
          saveAsImage: { title: 'SAVE' },
        },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
      ],
    };

    if (jsonData1.length > 0) {
      // console.log(jsonData);
      // const lookup = {};
      const items = jsonData1;
      const seriesHeight = {
        name: '키(남자)',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [],
      };
      const seriesWeight = {
        name: '몸무게(남자)',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [],
      };
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // option.xAxis[0].data.push(item['age_under(month)']);
        option.xAxis[0].data.push(getMonth2YearString(item['age_under(month)']));
        seriesHeight.data.push(item['height(cm)']);
        seriesWeight.data.push(item['weight(kg)']);
      }
      option.legend.data.push('키(남자)');
      option.legend.data.push('몸무게(남자)');
      option.series.push(seriesHeight);
      option.series.push(seriesWeight);
    }
    if (jsonData2.length > 0) {
      // console.log(jsonData);
      // const lookup = {};
      const items = jsonData2;
      const seriesHeight = {
        name: '키(여자)',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [],
      };
      const seriesWeight = {
        name: '몸무게(여자)',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [],
      };
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // option.xAxis[0].data.push(getMonth2YearString(item['age_under(month)']));
        seriesHeight.data.push(item['height(cm)']);
        seriesWeight.data.push(item['weight(kg)']);
      }
      option.legend.data.push('키(여자)');
      option.legend.data.push('몸무게(여자)');
      option.series.push(seriesHeight);
      option.series.push(seriesWeight);
    }

    const myHeight = {
      name: '키(내아이)',
      type: 'line',
      smooth: true,
      itemStyle: { normal: { areaStyle: { type: 'default' } } },
      data: [49.2, 50.4, 52.4, 56],
    };
    const myWeight = {
      name: '몸무게(내아이)',
      type: 'line',
      smooth: true,
      itemStyle: { normal: { areaStyle: { type: 'default' } } },
      data: [3, 4.5, 5, 6],
    };

    option.legend.data.push('키(내아이)');
    option.legend.data.push('몸무게(내아이)');
    option.series.push(myHeight);
    option.series.push(myWeight);

    return option;
  }
  render() {
    // console.log('EChart', this.props.data);
    return (
      <ReactEcharts
        option={this.getOption(this.props.data1, this.props.data2)}
        style={{ height: '350px', width: '100%' }}
        className="react_for_echarts"
      />
    );
  }
}

StandardGrowthChart.propTypes = {
  data1: React.PropTypes.array,
  data2: React.PropTypes.array,
};
