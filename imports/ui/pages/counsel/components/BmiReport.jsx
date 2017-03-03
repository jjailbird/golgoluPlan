import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { green500, green900 } from 'material-ui/styles/colors';
import StandardGrowthChart from './StandardGrowthChart.jsx';
import { getBmiPoint, getBmiDescription } from '../functions/bmiFunctions.js';

class BmiReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData1: [],
      chartData2: [],
    };
  }
  componentWillMount() {
    HTTP.get(Meteor.absoluteUrl('data/standardGrowthData.json'),
      (err, result) => {
        if (!err && result.data) {
          // console.log('data', result.data.male);
          this.setState({
            chartData1: result.data.male,
            chartData2: result.data.female,
          });
        } else {
          console.log('err', err);
        }
      }
    );
  }
  render() {
    // const stDataMale = this.state.chartData1;
    // const stDataFemale = this.state.chartData2;
    const { name, sex, publishedAt, birthDate, height, weight } = this.props;

    const bmiPoint = getBmiPoint(weight, height);
    const bmiDesc = getBmiDescription(bmiPoint);
    return (
      <div>
        <Paper
          className="bmiInfo-block"
          zDepth={0}
          style={{
            backgroundColor: green500,
          }}
        >
          <table className="center">
            <tbody>
              <tr>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <FontIcon
                            className="icon-scale"
                            style={{ fontSize: '36px', marginRight: '10px' }}
                            color="#fff"
                          />
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ borderBottom: '1px solid #fff', padding: '6px' }}>
                            <span
                              style={{ color: '#fff', fontSize: '32px', fontWeight: 'normal' }}
                            >
                              {weight}
                            </span>
                            <span
                              style={{
                                color: '#fff', fontSize: '18px', fontWeight: 'normal',
                                marginLeft: '8px',
                              }}
                            >
                              kg
                            </span>
                          </div>
                          <div style={{ marginTop: '6px', padding: '6px' }}>
                            <span
                              style={{
                                color: '#fff', fontSize: '32px', fontWeight: 'normal',
                              }}
                            >
                              {height}
                            </span>
                            <span
                              style={{
                                color: '#fff', fontSize: '18px', fontWeight: 'normal',
                                marginLeft: '4px',
                              }}
                            >
                              cm
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  <div
                    className="bmi-desc-badge"
                    style={{
                      fontSize: '14px',
                      marginBottom: '10px',
                    }}
                  >
                    BMI지수
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#fff', fontSize: '20px' }}>{bmiPoint.toFixed(1)}</span>
                    {/* <span style={{ color: '#fff', fontSize: '14px' }}> kg/m</span> */}
                  </div>
                  <div style={{ fontSize: '16px', color: '#fbce54', textAlign: 'right' }}>
                    {bmiDesc}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
        <Paper
          className="bmiInfo-description"
          zDepth={0}
        >
          <h5>
            {name}님의 신장은 또래 평균 120cm보다 8.5cm가 크고,<br />
            체중은 또래 평균 26.3kg보다 5.3kg이나 많이 나갑니다.<br />
            BMI지수는 {bmiPoint.toFixed(1)}(으)로 '{bmiDesc}'입니다.
          </h5>
          <StandardGrowthChart
            data1={this.state.chartData1}
            data2={this.state.chartData2}
          />
        </Paper>
      </div>
    );
  }
}

BmiReport.propTypes = {
  name: React.PropTypes.string,
  sex: React.PropTypes.string,
  birthDate: React.PropTypes.string,
  height: React.PropTypes.number,
  weight: React.PropTypes.number,
  publishedAt: React.PropTypes.string,
};

export default BmiReport;
