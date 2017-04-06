import React, { Component, PureComponent } from 'react';
import { Table, Tr, Td } from 'reactable';
import FontIcon from 'material-ui/FontIcon';
import { red100 } from 'material-ui/styles/colors';

export default class FoodList extends Component {
  constructor(props) {
    super(props);
    // this.onAddButtonClick = this.onAddButtonClick.bind(this);
  }
  onAddButtonClick(data) {
    // console.log('FoodList onAddButtonClick', this.props.mealType);
    this.props.onAddButtonClick(this.props.mealType, data);
  }
  render() {
    const { fooddata, mealType } = this.props;
    return (
      fooddata.length > 0 ?
        <Table
          className="reactable food-list width-full no-header"
        >
        {fooddata.map((food, idx) => (
          <Tr key={idx}>
            <Td column="검색된 음식" value={food.DESC_KOR}>
              <div className="tablelike container">
                <div
                  style={{
                    float: 'left', width: 'auto', paddingRight: '40px',
                    textAlign: 'left',
                  }}
                >
                  {food.DESC_KOR}
                  <span style={{ color: '#808080', paddingLeft: '10px' }}>
                    ( 1회 {food.SERVING_WT}g /
                    <span style={{ color: red100, marginLeft: '10px' }}>{food.NUTR_CONT1}kcal</span> )
                  </span>
                </div>
                <div style={{ width: '40px', position: 'absolute', right: '10px' }}>
                  <FontIcon
                    className="icon-plus-circle-line"
                    style={{ fontSize: '18px', cursor: 'pointer' }}
                    onClick={() => this.onAddButtonClick(food)}
                    // onTouchTap={this.onAddButtonClick(food)}
                  />
                </div>
              </div>
            </Td>
          </Tr>
        ))}
        </Table>
      :
        <div>
          검색된 음식이 없습니다.
        </div>
    );
  }
}

FoodList.propTypes = {
  fooddata: React.PropTypes.array,
  mealType: React.PropTypes.string,
  onAddButtonClick: React.PropTypes.func,
};
