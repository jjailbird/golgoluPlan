import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';

class AnswerCheckButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick(e) {
    const objCheck = e.target.parentNode;
    const idxCheck = objCheck.dataset.idx;
    this.props.onChange(Number(idxCheck));
  }
  render() {
    const answers = [
      { idx: 1, numbering: 'a', desc: '전혀 아니다', point: 1 },
      { idx: 2, numbering: 'b', desc: '아니다', point: 2 },
      { idx: 3, numbering: 'c', desc: '보통이다', point: 3 },
      { idx: 4, numbering: 'd', desc: '그렇다', point: 4 },
      { idx: 5, numbering: 'e', desc: '매우 그렇다', point: 5 },
    ];

    const selectedIndex = this.props.answer;
    const answerWithStyles = answers.map((answer) => {
      const style = {};
      if (answer.idx === selectedIndex) {
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
                className={
                  answer.idx === selectedIndex ? 'ehdAnswer-check-button selected' : 'ehdAnswer-check-button'
                }
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
  // dispatch: React.PropTypes.func,
  answer: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    // user: state.authenticate.user,
    // dispatch: React.PropTypes.func,
    question: state.ehdQuestion.selectedQuestion,
    answer: state.ehdQuestion.selectedAnswer,
  };
}
export default connect(mapStateToProps)(AnswerCheckButtonGroup);

