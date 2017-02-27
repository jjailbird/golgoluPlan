import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import { green500 } from 'material-ui/styles/colors';

class FamilyProfile extends React.PureComponent {
  render() {
    const { profile } = this.props;
    return (
      <table className="family-profile center">
        <tbody>
          <tr>
            <td>
              <Avatar size={70} src={profile.image} />
            </td>
            <td>
              <h4 style={{ margin: '0px 0px 10px 0px' }}>
                {profile.name} /
                <FontIcon
                  className={profile.sexIconClass}
                  style={{ fontSize: '20px' }}
                  color={green500}
                />
                {profile.sex} / {`${profile.age} 세`}
              </h4>
              <select
                className="select-underline-mini label-register"
                name="selectBmiPubDate"
                // value={this.state.bmiPubDate}
                // onChange={this.onBmiPubDateChange}
              >
                {profile.bmiData.map((bmi, idx) => (
                  <option
                    key={idx}
                    value={bmi.publishedAt}
                    data-height={bmi.height}
                    data-weight={bmi.weight}
                  >
                    기록일자 {bmi.publishedAt}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <FloatingActionButton>
                <IconAdd />
              </FloatingActionButton>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

FamilyProfile.propTypes = {
  profile: React.PropTypes.object,
};

export default FamilyProfile;
