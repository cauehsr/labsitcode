/* eslint-disable import/prefer-default-export */
import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'labsitcode/src/commons/colors';
import {GenericTextComponent} from './genericTextComponent';
import LottieView from 'lottie-react-native';
import {verticalScale} from 'labsitcode/src/commons/scaling';


export const GenericButtonComponent = ({
  buttonColor,
  textColor,
  text,
  onPress,
  loading,
  disabled,
  boderColor,
  styleguideItem,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled !== undefined ? (disabled ? null : onPress) : onPress}
      style={[
        styles.default,
        {
          backgroundColor:
            disabled !== undefined
              ? disabled
                ? colors.purple02
                : buttonColor
              : buttonColor,
          borderWidth: boderColor && 1,
          borderColor: boderColor,
          justifyContent: 'center',
          alignSelf: 'center',
        },
      ]}
      disabled={
        loading === undefined
          ? disabled !== undefined
            ? disabled
            : false
          : loading
      }>
      {!loading && (
        <GenericTextComponent
          styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
          color={
            disabled !== undefined
              ? disabled
                ? colors.white
                : textColor
              : textColor
          }
          text={text}
          textAlign="center"
        />
      )}
      {!!loading && (
        <LottieView
          style={styles.loadingIcon}
          source={require('labsitcode/src/config/lottie/loading-button.json')}
          autoPlay
          loop
        />
      )}
    </TouchableOpacity>
  );
};

GenericButtonComponent.defaultProps = {
  buttonColor: colors.pumpkinOrange,
  textColor: colors.white,
  text: '',
  loading: false,
};

GenericButtonComponent.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  boderColor: PropTypes.string,
};


const styles = StyleSheet.create({
  default: {
    width: Dimensions.get('window').width / 1.1,
    height: 70,
    borderRadius: 8,
  },
  loadingIcon: {
    top: verticalScale(2),
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
