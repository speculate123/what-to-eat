import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3';

class Arc extends Component {
  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    labelTextRotate: PropTypes.number,
    stoke: PropTypes.number,
    showInnerLabels: PropTypes.bool,
    fontColor: PropTypes.string,
    fontSize: PropTypes.string,
    fontFamily: PropTypes.string,
    writingModel: PropTypes.string
  };

  renderInnerLabel(props, Arc) {
    let midAngle = props.endAngle < Math.PI
      ? props.startAngle / 2 + props.endAngle / 2
      : props.startAngle / 2 + props.endAngle / 2 + Math.PI;
    let textAngle = midAngle * 180 / Math.PI > 180
      ? midAngle * 180 / Math.PI - 180
      : midAngle * 180 / Math.PI;
    return (
      <text
        className="rld-value"
        transform={`translate(${Arc.centroid()}) rotate(${textAngle})`}
        dy=".45em"
        style={{
          shapeRendering: 'crispEdges',
          textAnchor: 'middle',
          writingMode: props.writingModel,
          fontSize: props.fontSize,
          fill: props.fontColor
        }}
      >
        {props.text}
      </text>
    );
  }

  render() {
    const props = this.props;
    const Arc = arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius)
      .startAngle(props.startAngle)
      .endAngle(props.endAngle);

    return (
      <g className="rld-compass">
        <path d={Arc()} fill={props.fill} stroke={props.stoke} />
        {props.showInnerLabels ? this.renderInnerLabel(props, Arc) : null}
      </g>
    );
  }
}

export default Arc;
