import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import Mapbox from '@mapbox/react-native-mapbox-gl';

const styles = Mapbox.StyleSheet.create({
  innerCircle: {
    circleColor: 'white',
    circleStrokeWidth: 1,
    circleStrokeColor: '#c6d2e1',
  },
  innerCirclePulse: {
    circleColor: '#4264fb',
    circleStrokeColor: '#c6d2e1',
    circleStrokeWidth: 1,
  },
  outerCircle: {
    circleOpacity: 0.40,
    circleColor: '#c6d2e1',
  },
});

class PulseCircleLayer extends React.Component {
  static propTypes = {
    radius: PropTypes.number,
    pulseRadius: PropTypes.number,
    duration: PropTypes.number,

    innerCircleStyle: PropTypes.any,
    outerCircleStyle: PropTypes.any,
    shape: PropTypes.any,

    aboveLayerID: PropTypes.string,
  }

  static defaultProps = {
    radius: 20,
    pulseRadius: 10,
    duration: 1000,
  };

  constructor (props) {
    super(props);

    this.state = {
      innerRadius: new Animated.Value(props.radius * 0.50),
      pulseOpacity: new Animated.Value(1),
      pulseRadius: new Animated.Value(props.radius),
    };

    this._loopAnim = null;
  }

  componentDidMount () {
    const expandOutAnim = Animated.parallel([
      Animated.timing(this.state.pulseOpacity, {
        toValue: 0,
        duration: this.props.duration,
      }),
      Animated.timing(this.state.pulseRadius, {
        toValue: this.props.pulseRadius,
        duration: this.props.duration,
      }),
      Animated.timing(this.state.innerRadius, {
        toValue: this.props.radius * 0.70,
        duration: this.props.duration / 2,
      }),
    ]);

    const shrinkInAnim = Animated.parallel([
      Animated.timing(this.state.pulseRadius, {
        toValue: this.props.radius,
        duration: this.props.duration / 2,
      }),
      Animated.timing(this.state.innerRadius, {
        toValue: this.props.radius * 0.50,
        duration: this.props.duration / 2,
      }),
    ]);

    this._loopAnim = Animated.loop(
      Animated.sequence([expandOutAnim, shrinkInAnim]),
    );

    this._loopAnim.start(() => {
      this.setState({ pulseOpacity: 1 });
    });
  }

  componentWillUnmount () {
    this._loopAnim.stop();
  }

  render () {
    if (!this.props.shape) {
      return null;
    }

    const innerCircleStyle = [
      styles.innerCircle,
      this.props.innerCircleStyle,
      { circleRadius: this.props.radius },
    ];

    const innerCirclePulseStyle = [
      styles.innerCirclePulse,
      { circleRadius: this.state.innerRadius },
    ];

    const outerCircleStyle = [
      styles.outerCircle,
      this.props.outerCircleStyle,
      { circleRadius: this.state.pulseRadius, circleOpacity: this.state.pulseOpacity },
    ];

    return (
      <Mapbox.Animated.ShapeSource id='pulseCircleSource' shape={this.props.shape}>
          <Mapbox.Animated.CircleLayer id='pulseOuterCircle' style={outerCircleStyle} aboveLayerID={this.props.aboveLayerID} />
          <Mapbox.Animated.CircleLayer id='pulseInnerCircleCnt' style={innerCircleStyle} aboveLayerID='pulseOuterCircle' />
          <Mapbox.Animated.CircleLayer id='pulseInnerCircle' style={innerCirclePulseStyle} aboveLayerID='pulseInnerCircleCnt' />
      </Mapbox.Animated.ShapeSource>
    );
  }
}

export default Animated.createAnimatedComponent(PulseCircleLayer);
