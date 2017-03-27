import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import FileUploadImageBox from '../../../components/FileUploadImageBox.jsx';

export default class MealRecordPhotoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
  }
  render() {
    const { title, mealType, userId, familyId } = this.props;
    return (
      <Paper
        className="counsel-step-button-container"
        style={{ border: '2px solid #999', padding: '10px' }}
        zDepth={0}
      >
        <Accordion>
          <AccordionItem
            title={
              <div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%', textAlign: 'left', cursor: 'pointer' }}>
                        <h4 style={{ margin: '0px' }}>{title}</h4>
                      </td>
                      <td style={{ width: '50%', textAlign: 'right', cursor: 'pointer' }}>
                        <FontIcon
                          className="icon-camera-1"
                          style={{ fontSize: '26px' }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
            slug={1} key={1}
          >
            <div>
              <Divider />
              <table style={{ width: '100%', marginTop: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ width: '100%', backgroundColor: '#EFEFEF' }}>
                        <FileUploadImageBox
                          category="mealRecord"
                          mealType={mealType}
                          mealTime="before"
                          userId={userId}
                          familyId={familyId}
                        />
                      </div>
                      <h4 style={{ margin: '0px' }}>식전</h4>
                    </td>
                    <td style={{ width: '50%' }}>
                      <div style={{ width: '100%', backgroundColor: '#EFEFEF' }}>
                        <FileUploadImageBox
                          category="mealRecord"
                          mealType={mealType}
                          mealTime="after"
                          userId={userId}
                          familyId={familyId}
                        />
                      </div>
                      <h4 style={{ margin: '0px' }}>식후</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
        </Accordion>
      </Paper>
    );
  }
}

MealRecordPhotoPanel.propTypes = {
  title: React.PropTypes.string,
  mealType: React.PropTypes.oneOf([
    'breakFast', 'lunch', 'dinner', 'snack', 'snack_1', 'snack_2', 'snack_3']
  ),
  userId: React.PropTypes.string,
  familyId: React.PropTypes.string,
};
