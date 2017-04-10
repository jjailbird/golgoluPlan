import React from 'react';
import Paper from 'material-ui/Paper';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { green900, green500, amber500 } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

class EhdReportBox extends React.PureComponent {
  render() {
    const { averagePercent } = this.props;
    const horizontalLabels = {
      0: '0',
      20: '20',
      40: '40',
      60: '60',
      80: '80',
      100: '100',
    };
    const formatPc = p => (p + '%');
    return (
      <Paper
        className="counsel-step-button-container"
        zDepth={0}
      >
        <table>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <div>
                  식습관 진단 점수
                  <span
                    style={{ paddingLeft: '4px', fontSize: '24px', color: green500, fontWeight: 'bold' }}
                  >
                    {averagePercent.toFixed(1)}
                  </span>
                </div>
                <div className="slider custom-labels ehd-average">
                  <Slider
                    min={0}
                    max={100}
                    value={averagePercent}
                    labels={horizontalLabels}
                    format={formatPc}
                    onChange={this.handleChangeHorizontal}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
    );
  }
}

EhdReportBox.propTypes = {
  averagePercent: React.PropTypes.number,
};

export default EhdReportBox;
