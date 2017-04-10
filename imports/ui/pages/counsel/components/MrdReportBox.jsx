import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';

import React from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import { Accordion, AccordionItem } from 'react-sanfona';
import { UserFoodLog } from '../../../../api/collections/UserFoodLog.js';

import { green500 } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

class MrdReportBox extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      subscription: {
        userFoodLog: Meteor.subscribe('UserFoodLog.private.family',
          this.props.familyId),
      },
    };
  }
  userFoodLogs(mealType) {
    let foodLog = [];
    if (mealType === 'all') {
      foodLog = UserFoodLog.find({}).fetch();
    } else {
      foodLog = UserFoodLog.find({ mealType }).fetch();
    }
    return foodLog;
  }
  render() {
    const mealTypes = [
      { title: '아침', mealType: 'breakFast' },
      { title: '간식', mealType: 'snack_1' },
      { title: '점심', mealType: 'lunch' },
      { title: '간식', mealType: 'snack_2' },
      { title: '저녁', mealType: 'dinner' },
      { title: '간식', mealType: 'snack_3' },
    ];
    let totalCalories = 0;
    if (this.state.subscription.userFoodLog.ready()) {
      const foodLogs = this.userFoodLogs('all');
      for (let i = 0; i < foodLogs.length; i++) {
        totalCalories += foodLogs[i].meal.NUTR_CONT1;
      }
    }
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
                  식사일기 분석
                  <span
                    style={{ paddingLeft: '4px', fontSize: '24px', color: green500, fontWeight: 'bold' }}
                  >
                    {totalCalories.toFixed(1)} kcal
                  </span>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
        <Accordion
          activeItems={-1}
          allowMultiple
        >
          {mealTypes.map((meal, idx) => {
            const userFoodLogs = this.userFoodLogs(meal.mealType);
            let totalCalorie = 0;
            for (let i = 0; i < userFoodLogs.length; i++) {
              totalCalorie += userFoodLogs[i].meal.NUTR_CONT1;
            }
            return (
              <AccordionItem
                key={idx}
                slug={idx}
                // onExpand={() => { alert(`expand ${idx}`); }}
                // onClose={() => { alert(`close ${idx}`); }}
                title={
                  <div>
                    <table style={{ width: '100%' }}>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'left', cursor: 'pointer' }}>
                            <h3 style={{ margin: '0px' }}>
                              {meal.title}
                              <span
                                style={{
                                  color: green500, paddingLeft: '14px', width: '100px',
                                  textAlign: 'right',
                                }}
                              >
                                {totalCalorie > 0 ? totalCalorie.toLocaleString() : ''}
                              </span>
                            </h3>
                          </td>
                          <td
                            style={{ width: '50px', textAlign: 'right', cursor: 'pointer' }}
                          >
                            <Toggle
                              label=""
                              style={{ width: 'auto' }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                }
              >
                <div>
                  <table style={{ width: '100%', marginTop: '5px' }}>
                    <tbody>
                    {userFoodLogs.map((log, index) => (
                      <tr key={index}>
                        <td style={{ width: '80%', textAlign: 'left' }}>
                          <div>
                            {log.meal.DESC_KOR}
                          </div>
                          <div style={{ fontSize: '10px', color: '#999' }}>
                            {log.meal.SERVING_WT}g
                          </div>
                        </td>
                        <td style={{ width: '20%', textAlign: 'right' }}>
                          <div style={{ color: green500 }}>
                            {log.meal.NUTR_CONT1}
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Paper>
    );
  }
}

MrdReportBox.propTypes = {
  familyId: React.PropTypes.string,
};

export default MrdReportBox;
