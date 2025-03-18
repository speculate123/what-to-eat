import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { schemeCategory20, pie } from 'd3';
import Arc from './Arc';

class Wheel extends Component {
  static propTypes = {
    wheelSize: PropTypes.number.isRequired,
    range: PropTypes.number.isRequired,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    stoke: PropTypes.number,
    showInnerLabels: PropTypes.bool,
    textArray: PropTypes.array,
    fontColor: PropTypes.string,
    fontSize: PropTypes.string,
    writingModel: PropTypes.string
  };
  static defaultProps = {};

  _processData(range) {
    let array = [];
    for (var i = 0; i < range; i++) {
      array.push(100 / range);
    }
    return array;
  }

  render() {
    const props = this.props;
    const transform = `translate(${props.wheelSize / 2},${props.wheelSize / 2}) rotate(-${180 / props.range})`;
    const data = this._processData(props.range);
    const arcs = pie()(data).sort();
    const Pie = arcs.map((i, idx) => {
      let colorIdx = idx > 19 ? idx % 20 : idx;
      const textLabel = !props.ArabicLabel
        ? props.textArray[idx] ? props.textArray[idx] : idx + 1
        : idx + 1;

      return (
        <Arc
          key={idx}
          innerRadius={props.innerRadius}
          outerRadius={props.outerRadius}
          startAngle={i.startAngle}
          endAngle={i.endAngle}
          showInnerLabels={props.showInnerLabels}
          text={textLabel}
          fill={schemeCategory20[colorIdx]}
          stoke={props.stoke}
          fontColor={props.fontColor}
          fontSize={props.fontSize}
          writingModel={props.writingModel}
        />
      );
    });
    return (
      <svg width={props.wheelSize} height={props.wheelSize}>
        <g transform={transform}>
          {Pie}
        </g>
      </svg>
    );
  }
}

export default Wheel;
