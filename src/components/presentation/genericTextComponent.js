/* eslint-disable import/prefer-default-export */
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'labsitcode/src/commons/colors';
import {fontScale} from 'labsitcode/src/commons/scaling';

const StyleguideItem = {
  HEADINGXL: 'HEADINGXL',
  HEADINGL: 'HEADINGL',
  TEXTSTYLE: 'TEXTSTYLE',
  HEADING: 'HEADING',
  HEADINGLIGHT: 'HEADINGLIGHT',
  HEADING16: 'HEADING16',
  POST: 'POST',
  POST16: 'POST16',
  LINK16: 'LINK16',
  LINK20: 'LINK20',
  BODY: 'BODY',
  BUTTON: 'BUTTON',
  LINK: 'LINK',
  TINYBOLD: 'TINYBOLD',
  TINYBLACK: 'TINYBLACK',
  DEFAULT: 'DEFAULT',
  TINY: 'TINY',
  LINK50: 'LINK50',
};

export const GenericTextComponent = ({
  styleguideItem,
  text,
  color,
  opacity,
  textAlign,
  marginTop,
  marginRight,
  marginBottom,
  borderBottomWidth,
  borderBottomColor,
  borderTopWidth,
  paddingHorizontal,
  paddingTop,
  paddingBottom,
  numberOfLines,
  strike,
  style,
}) => {
  let currentStyle;

  switch (styleguideItem) {
    case StyleguideItem.HEADINGXL:
      currentStyle = styles.headingXL;
      break;
    case StyleguideItem.HEADINGL:
    case StyleguideItem.TEXTSTYLE:
      currentStyle = styles.headingLtextStyle;
      break;
    case StyleguideItem.HEADING:
      currentStyle = styles.heading;
      break;
    case StyleguideItem.HEADINGLIGHT:
      currentStyle = styles.headingLight;
      break;
    case StyleguideItem.POST:
      currentStyle = styles.post;
      break;
    case StyleguideItem.POST16:
      currentStyle = styles.post16;
      break;
    case StyleguideItem.HEADING16:
      currentStyle = styles.heading16;
      break;
    case StyleguideItem.LINK16:
      currentStyle = styles.link16;
      break;
    case StyleguideItem.LINK20:
      currentStyle = styles.link20;
      break;
    case StyleguideItem.BODY:
      currentStyle = styles.body;
      break;
    case StyleguideItem.BUTTON:
      currentStyle = styles.button;
      break;
    case StyleguideItem.LINK:
      currentStyle = styles.link;
      break;
    case StyleguideItem.TINYBOLD:
      currentStyle = styles.tinyBold;
      break;
    case StyleguideItem.LINK50:
      currentStyle = styles.link50;
      break;
    case StyleguideItem.TINYBLACK:
      currentStyle = styles.tinyBlack;
      break;
    case StyleguideItem.TINY:
      currentStyle = styles.tiny;
      break;
    default:
      currentStyle = styles.default;
      break;
  }

  return (
    <Text
      style={[
        currentStyle,
        {
          opacity,
          color,
          textAlign,
          marginTop,
          marginBottom,
          borderBottomWidth,
          borderBottomColor,
          borderTopWidth,
          paddingHorizontal,
          paddingTop,
          paddingBottom,
          marginRight,
        },
        !!strike && styles.strike,
        style,
      ]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

GenericTextComponent.defaultProps = {
  styleguideItem: StyleguideItem.DEFAULT,
  text: '',
  color: colors.black,
  opacity: 1,
  textAlign: 'left',
  marginTop: 0,
  marginBottom: 0,
  borderBottomWidth: 0,
  borderBottomColor: 'black',
  borderTopWidth: 0,
  paddingHorizontal: 0,
  paddingTop: 0,
  paddingBottom: 0,
  marginRight: 0,
  numberOfLines: 999,
  strike: false,
};

GenericTextComponent.propTypes = {
  styleguideItem: PropTypes.oneOf(Object.keys(StyleguideItem)),
  text: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  textAlign: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderBottomColor: PropTypes.string,
  borderTopWidth: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  marginRight: PropTypes.number,
  numberOfLines: PropTypes.number,
  strike: PropTypes.bool,
};

GenericTextComponent.StyleguideItem = StyleguideItem;

const styles = StyleSheet.create({
  headingXL: {
    fontSize: fontScale(25),
    fontFamily: 'Roboto-Regular',
  },
  headingLtextStyle: {
    fontSize: fontScale(28),
    fontFamily: 'Roboto-Regular',
  },
  heading: {
    fontSize: fontScale(18),
    fontFamily: 'Roboto-Bold',
  },
  link50: {
    fontSize: fontScale(50),
    fontFamily: 'Roboto-Bold',
  },
  headingLight: {
    fontSize: fontScale(18),
    fontFamily: 'Roboto-Light',
  },
  post: {
    fontSize: fontScale(22),
    fontFamily: 'Roboto-Light',
  },
  heading16: {
    fontSize: fontScale(16),
    fontFamily: 'Roboto-Regular',
  },
  post16: {
    fontSize: fontScale(16),
    fontFamily: 'Roboto-Light',
  },
  link16: {
    fontSize: fontScale(18),
    fontFamily: 'Lato-Regular',
  },
  link20: {
    fontSize: fontScale(20),
    fontFamily: 'Lato-Regular',
  },
  body: {
    fontSize: fontScale(24),
    fontFamily: 'Lato-Bold',
  },
  default: {
    fontSize: fontScale(14),
    fontFamily: 'Lato-Regular',
    lineHeight: 18,
  },
  button: {
    fontSize: fontScale(14),
    fontFamily: 'Roboto-Black',
  },
  link: {
    fontSize: fontScale(14),
    fontFamily: 'Lato-Bold',
  },
  tinyBold: {
    fontSize: fontScale(12),
    fontFamily: 'Lato-Bold',
  },
  tinyBlack: {
    fontSize: fontScale(12),
    fontFamily: 'Roboto-Black',
  },
  tiny: {
    fontSize: fontScale(12),
    fontFamily: 'Lato-Regular',
  },
  strike: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
