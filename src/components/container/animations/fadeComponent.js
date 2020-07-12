/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

const FadeType = {
  FADEIN: 'FADEIN',
  FADEOUT: 'FADEOUT'
};

export default class FadeComponent extends Component {
  constructor(props) {
    super(props);

    this.isFadeIn = props.type === FadeType.FADEIN;

    this.state = {
      callbackTrigger: this.isFadeIn ? 1 : 0,
      value: new Animated.Value(this.isFadeIn ? 0 : 1),
      duration: props.duration,
      type: props.type,
      executeFadeOut: props.executeFadeOut
    };
  }

  componentDidMount() {
    const { callbackTrigger, executeFadeOut, type } = this.state;
    const { autoPlay, callback } = this.props;

    callback &&
      this.state.value.addListener(({ value }) => {
        if (this.isFadeIn && value >= callbackTrigger) {
          executeFadeOut ? this._executeFadeOut() : callback();
        } else if (type === FadeType.FADEOUT && value === callbackTrigger) {
          callback();
        }
      });

    autoPlay && this._start();
  }

  componentDidUpdate(prevProps) {
    const { startWhen } = this.props;
    startWhen !== prevProps.startWhen && this._start();
  }

  _executeFadeOut = () => {
    this.setState(
      {
        executeFadeOut: false,
        type: FadeType.FADEOUT,
        value: new Animated.Value(1),
        callbackTrigger: 0.9
      },
      () => {
        const { callback } = this.props;
        callback();
      }
    );

    this._start();
  };

  _start = () => {
    const { value, duration } = this.state;

    Animated.timing(value, {
      toValue: this.isFadeIn ? 1 : 0,
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
          opacity: value
        }}
      >
        {children}
      </Animated.View>
    );
  }
}

FadeComponent.FadeType = FadeType;

FadeComponent.defaultProps = {
  duration: 1000,
  type: FadeComponent.FadeType.FADEIN,
  executeFadeOut: false
};

FadeComponent.propTypes = {
  children: PropTypes.element,
  duration: PropTypes.number,
  callbackTrigger: PropTypes.number,
  startWhen: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(FadeType)),
  executeFadeOut: PropTypes.bool,
  autoPlay: PropTypes.bool
};
