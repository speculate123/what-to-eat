import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wheel from './Wheel';

class LuckyDraw extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    range: PropTypes.number.isRequired,
    wheelSize: PropTypes.number,
    turns: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    stoke: PropTypes.number,
    showInnerLabels: PropTypes.bool,
    drawLimitSwitch: PropTypes.bool,
    drawLimit: PropTypes.number,
    textArray: PropTypes.array,
    fontColor: PropTypes.string,
    fontSize: PropTypes.string,
    writingModel: PropTypes.string,
    drawButtonLabel: PropTypes.string,
    ArabicLabel: PropTypes.bool,
    onSuccessDrawReturn: PropTypes.func,
    onOutLimitAlert: PropTypes.func
  };
  static defaultProps = {
    width: 500,
    height: 350,
    stoke: 20,
    range: 20,
    turns: 3,
    rotateSecond: 5,
    drawLimit: 3,
    drawLimitSwitch: false,
    fontColor: '#000',
    fontSize: '18px',
    writingModel: 'tb',
    drawButtonLabel: 'Start',
    ArabicLabel: false,
    textArray: []
  };

  constructor(props) {
    super(props);
    if (!('wheelSize' in props)) {
      this.props.wheelSize = this.defaultProps.width * 2;
    }
    this.state = {
      startDraw: false,
      drawTimes: 1,
      randomNumber: null,
      rolling: false
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     return true
  // }

  _processRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _processDrawAngle(range, turns, drawTimes, drawNumber) {
    const peer = 360 / range;
    const totalAngle = 360 * turns * drawTimes + drawNumber * peer;
    return totalAngle;
  }

  _processDrawing(e) {
    e.preventDefault();
    if (!this.state.rolling) {
      let drawTime = this.state.drawTimes;
      if (this.props.drawLimitSwitch && drawTime - 1 < this.props.drawLimit) {
        this.setState({
          startDraw: true,
          rolling: true,
          randomNumber: this._processRandomNumber(0, this.props.range - 1),
          drawTimes: this.state.drawTimes + 1
        });
        setTimeout(
          () => {
            this.setState({
              rolling: false
            });
            this.props.onSuccessDrawReturn(this.state.randomNumber);
          },
          this.props.rotateSecond * 1000
        );
      } else {
        this.props.onOutLimitAlert(true);
      }
    }
  }

  render() {
    const state = this.state;
    const props = this.props;
    let transformRotate = state.startDraw
      ? this._processDrawAngle(
          props.range,
          props.turns,
          state.drawTimes,
          state.randomNumber
        )
      : 0;
    return (
      <div
        className="react_luckyDraw"
        style={{
          width: props.width,
          height: props.height
        }}
      >
        <div
          className={
            state.rolling ? 'compass__container rolling' : 'compass__container'
          }
        >
          <div className="control__panel">
            <div className="compass__arrow" />
            <div
              className="compass__spin"
              style={{
                width: props.wheelSize + 'px',
                height: props.wheelSize + 'px',
                transform: `rotate(${-transformRotate}deg) translate3d(0,0,-1px)`,
                transitionDuration: `${props.rotateSecond}s`
              }}
            >
              <Wheel {...props} />
            </div>
          </div>
          <div className="compass__btn">
            <button
              className="bttn-jelly bttn-md bttn-danger"
              onClick={e => {
                this._processDrawing(e);
              }}
            >
              {props.drawButtonLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LuckyDraw;
