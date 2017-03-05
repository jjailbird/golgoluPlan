import { observable, extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';

@observer
class AnswerCheckButtonGroup extends React.Component {
  @observable selection = null;
  constructor(props, context) {
    super(props, context);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.selection = this.props.selectIndex;
    /*
    this.state = {
      checkedIndex: 0,
    };
    */
  }
  componentWillReceiveProps() {
    this.selection = this.props.selectIndex;
    /*
    this.setState({
      checkedIndex: this.selection,
    });
    */
    // alert(this.state.checkedIndex);
  }

  onButtonClick(e) {
    const objCheck = e.target.parentNode;
    const idxCheck = objCheck.dataset.idx;
    this.props.onChange(Number(idxCheck));
    if (idxCheck) {
      this.selection = Number(idxCheck);
      /*
      this.setState({
        checkedIndex: Number(idxCheck),
      });
      */
    }
    console.log('this.selection', this.selection);
  }
  render() {
    const answers = [
      { idx: 1, numbering: 'a', desc: '전혀 아니다', point: 1 },
      { idx: 2, numbering: 'b', desc: '아니다', point: 2 },
      { idx: 3, numbering: 'c', desc: '보통이다', point: 3 },
      { idx: 4, numbering: 'd', desc: '그렇다', point: 4 },
      { idx: 5, numbering: 'e', desc: '매우 그렇다', point: 5 },
    ];

    console.log('selection', this.selection);

    const answerWithStyles = answers.map((answer) => {
      const style = {};
      if (answer.idx === this.selection) {
        style.color = {
          color: '#fff',
          // backgroundColor: '#4ab046',
        };
        style.checkColor = '#fbd145';
        style.backgroundColor = '#4ab046';
      } else {
        style.color = {
          color: '#000',
          // backgroundColor: '#fff',
        };
        style.checkColor = '#eee';
        style.backgroundColor = '#fff';
      }
      return Object.assign(answer, style);
    });

    return (
      <div className="ehdAnswers">
        {
          answerWithStyles.map((answer) => (
            <div className="ehdAnswerRow" key={answer.idx} data-idx={answer.idx}>
              <div
                className="ehdAnswer-check-button"
                data-idx={answer.idx}
                data-point={answer.point}
                onTouchTap={this.onButtonClick}
                style={{
                  backgroundColor: answer.backgroundColor,
                }}
              >
                <div>{answer.numbering}</div>
                <div style={answer.color}>{answer.desc}</div>
                <div style={answer.color}>
                  <FontIcon
                    className="icon-checkmark inline-block-vertical-middle"
                    style={{ color: answer.checkColor, fontSize: '20px' }}
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

AnswerCheckButtonGroup.propTypes = {
  selectIndex: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

export default AnswerCheckButtonGroup;
