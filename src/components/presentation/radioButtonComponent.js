/* eslint-disable import/prefer-default-export */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { verticalScale, horizontalScale } from 'labsitcode/src/commons/scaling';
import colors from 'labsitcode/src/commons/colors';
import PropTypes from 'prop-types';
import { GenericTextComponent } from './genericTextComponent';

export const RadioButtonComponent = ({
  value,
  text,
  onPress,
  paddingVertical
}) => (
  <View>
    <TouchableOpacity
      style={[
        styles.button,
        { paddingVertical: paddingVertical || verticalScale(20) }
      ]}
      onPress={onPress}
    >
      <GenericTextComponent
        styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
        color={colors.midnightBlack}
        text={text}
        textAlign="center"
      />
      <View
        style={[
          styles.radioContainer,
          { borderColor: value ? colors.pumpkinOrange : colors.veryLightPink }
        ]}
      >
        <View style={[value ? styles.active : styles.inactive]} />
      </View>
    </TouchableOpacity>
  </View>
);

RadioButtonComponent.defaultProps = {
  value: false,
  text: ''
};

RadioButtonComponent.propTypes = {
  text: PropTypes.string,
  value: PropTypes.bool,
  paddingVertical: PropTypes.number
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.blackAlpha12
  },
  radioContainer: {
    width: 24,
    height: 24,
    marginRight: horizontalScale(5),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.veryLightPink,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white
  },
  active: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.pumpkinOrange
  }
});
