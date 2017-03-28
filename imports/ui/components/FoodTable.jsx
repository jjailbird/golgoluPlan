import React, { Component, PureComponent } from 'react';
import
  { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import MediaQuery from 'react-responsive';

const styles = {
  columnDefault: {
    width: '50px',
    paddingLeft: '5px',
    paddingRight: '5px',
    textAlign: 'center',
  },
};

export default class FoodTable extends PureComponent {
  render() {
    const { fooddata } = this.props;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn style={styles.columnDefault}>NUM</TableHeaderColumn>
            <TableHeaderColumn>이름</TableHeaderColumn>
            <TableHeaderColumn style={styles.columnDefault}>1회제공량<br />(g)</TableHeaderColumn>
            <TableHeaderColumn style={styles.columnDefault}>열량<br />(kcal)</TableHeaderColumn>
            <TableHeaderColumn style={styles.columnDefault}>탄수화물<br />(g)</TableHeaderColumn>
            <TableHeaderColumn style={styles.columnDefault}>단백질<br />(g)</TableHeaderColumn>
            <TableHeaderColumn style={styles.columnDefault}>지방<br />(g)</TableHeaderColumn>
            <TableHeaderColumn style={styles.columnDefault}>당류<br />(g)</TableHeaderColumn>
            <TableHeaderColumn style={styles.columnDefault}>나트륨<br />(mg)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
        {fooddata.map((row, idx) => (
          <TableRow key={idx}>
            <TableRowColumn style={styles.columnDefault}>{row.NUM}</TableRowColumn>
            <TableRowColumn>{row.DESC_KOR}</TableRowColumn>
            <TableRowColumn style={styles.columnDefault}>{row.SERVING_WT}</TableRowColumn>
            <TableRowColumn style={styles.columnDefault}>{row.NUTR_CONT1}</TableRowColumn>
            <TableRowColumn style={styles.columnDefault}>{row.NUTR_CONT2}</TableRowColumn>
            <TableRowColumn style={styles.columnDefault}>{row.NUTR_CONT3}</TableRowColumn>
            <TableRowColumn style={styles.columnDefault}>{row.NUTR_CONT4}</TableRowColumn>
            <TableRowColumn style={styles.columnDefault}>{row.NUTR_CONT5}</TableRowColumn>
            <TableRowColumn style={styles.columnDefault}>{row.NUTR_CONT6}</TableRowColumn>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    );
  }
}

FoodTable.propTypes = {
  fooddata: React.PropTypes.array,
};
