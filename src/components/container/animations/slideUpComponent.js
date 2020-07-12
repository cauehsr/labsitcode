/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export default class SlideUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
      duration: props.duration,
      callbackTrigger: 1
    };
  }

  componentDidMount() {
    const { autoPlay, callback } = this.props;
    const { callbackTrigger } = this.state;

    callback &&
      this.state.value.addListener(({ value }) => {
        value >= callbackTrigger && callback();
      });

    autoPlay && this._start();
  }

  componentDidUpdate(prevProps) {
    const { startWhen } = this.props;
    startWhen !== prevProps.startWhen && this._start();
  }

  _start = () => {
    const { value, duration } = this.state;

    Animated.timing(value, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { value } = this.state;
    const { children, style, ...props } = this.props;
    return (
      <Animated.View
        {...props}
        style={{
          ...style,
          transform: [
            {
              translateY: value.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0]
              })
            },
            {
              perspective: 1000
            }
          ]
        }}
      >
        {children}
      </Animated.View>
    );
  }
}

SlideUpComponent.defaultProps = {
  duration: 500
};

SlideUpComponent.propTypes = {
  children: PropTypes.element,
  duration: PropTypes.number,
  callbackTrigger: PropTypes.number,
  startWhen: PropTypes.bool,
  autoPlay: PropTypes.bool
};
