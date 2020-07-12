/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'labsitcode/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';
import LottieView from 'lottie-react-native';
import { verticalScale } from 'labsitcode/src/commons/scaling';


const StyleguideItem = {
  BUTTON: 'BUTTON',
  HALFBUTTON: 'HALFBUTTON',
  HALFBUTTONPROFILE: 'HALFBUTTONPROFILE',
  TINYBUTTON: 'TINYBUTTON',
  BUTTONMODAL: 'BUTTONMODAL'
};

export const GenericButtonComponent = ({
  buttonColor,
  textColor,
  text,
  onPress,
  loading,
  disabled,
  boderColor,
  styleguideItem
}) => {
  let currentStyle;

  switch (styleguideItem) {
    case StyleguideItem.BUTTON:
      currentStyle = styles.button;
      break;
    case StyleguideItem.HALFBUTTON:
      currentStyle = styles.halfButton;
      break;
    case StyleguideItem.HALFBUTTONPROFILE:
      currentStyle = styles.halfButtonProfile;
      break;
    case StyleguideItem.BUTTONMODAL:
      currentStyle = styles.buttonModal;
      break;
    case StyleguideItem.TINYBUTTON:
      currentStyle = styles.tinyButton;
      break;
    default:
      currentStyle = styles.default;
      break;
  }

  return (
    <TouchableOpacity
      onPress={disabled !== undefined ? (disabled ? null : onPress) : onPress}
      style={[
        currentStyle,
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
          alignSelf: 'center'
        }
      ]}
      disabled={
        loading === undefined
          ? disabled !== undefined
            ? disabled
            : false
          : loading
      }
    >
      {!loading && (
        <GenericTextComponent
          styleguideItem={
            styleguideItem === StyleguideItem.TINYBUTTON
              ? GenericTextComponent.StyleguideItem.TINYBLACK
              : GenericTextComponent.StyleguideItem.BUTTON
          }
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
      {!!loading &&
        <LottieView
          style={styles.loadingIcon}
          source={require('labsitcode/src/config/lottie/loading-03.json')}
          autoPlay
          loop
        />
      }
    </TouchableOpacity>
  );
};

GenericButtonComponent.defaultProps = {
  styleguideItem: StyleguideItem.DEFAULT,
  buttonColor: colors.pumpkinOrange,
  textColor: colors.white,
  text: '',
  loading: false
};

GenericButtonComponent.propTypes = {
  styleguideItem: PropTypes.oneOf(Object.keys(StyleguideItem)),
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  boderColor: PropTypes.string
};

GenericButtonComponent.StyleguideItem = StyleguideItem;

const styles = StyleSheet.create({
  default: {
    width: Dimensions.get('window').width / 1.2,
    height: 50,
    borderRadius: 8
  },
  halfButton: {
    width: Dimensions.get('window').width / 2.4,
    height: 50,
    borderRadius: 8
  },
  halfButtonProfile: {
    width: Dimensions.get('window').width / 2.2,
    height: 45,
    borderRadius: 8
  },
  buttonModal: {
    width: Dimensions.get('window').width / 1.7,
    height: 45,
    borderRadius: 8
  },
  tinyButton: {
    width: Dimensions.get('window').width / 3.9,
    height: 31,
    borderRadius: 6
  },
  loadingIcon: {
    top: verticalScale(2),
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
