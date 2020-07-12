/* eslint-disable import/prefer-default-export */
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { verticalScale, horizontalScale } from 'labsitcode/src/commons/scaling';
import colors from 'labsitcode/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';
import { TextLinkButtonComponent } from './textLinkButtonComponent';
import { GenericButtonComponent } from './genericButtonComponent';

export const GenericModalInfoContainerComponent = ({
  title,
  text,
  linkText,
  linkPress,
  buttonText,
  onPress
}) => (
  <View style={styles.container}>
    <GenericTextComponent
      styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
      color={colors.midnightBlack}
      text={title}
    />
    <GenericTextComponent
      styleguideItem={GenericTextComponent.StyleguideItem.BODY}
      color={colors.midnightBlack50}
      marginTop={verticalScale(10)}
      marginBottom={
        Platform.OS === 'ios' ? verticalScale(70) : verticalScale(40)
      }
      text={text}
    />
    {!!linkPress && !!linkText && (
      <TextLinkButtonComponent
        styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
        color={colors.pumpkinOrange}
        text={linkText}
        onPress={linkPress}
      />
    )}
    {!!onPress && !!buttonText && (
      <GenericButtonComponent
        buttonColor={colors.pumpkinOrange}
        textColor={colors.white}
        text={buttonText}
        onPress={onPress}
      />
    )}
  </View>
);

GenericModalInfoContainerComponent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  linkText: PropTypes.string,
  linkPress: PropTypes.bool,
  buttonText: PropTypes.string,
  onPress: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(64),
    paddingHorizontal: horizontalScale(32)
  },
  loadingIcon: {
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignSelf: 'flex-start'
  }
});
