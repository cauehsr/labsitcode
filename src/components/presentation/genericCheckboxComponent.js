/* eslint-disable import/prefer-default-export */
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'labsitcode/src/commons/colors';
import {
  GenericTextMiddleLinkComponent,
  GenericTextComponent
} from 'labsitcode/src/components/presentation';
import { horizontalScale, fontScale } from 'labsitcode/src/commons/scaling';
import { TextLinkButtonComponent } from 'labsitcode/src/components/presentation/textLinkButtonComponent';

export const GenericCheckboxComponent = ({
  text,
  text2,
  isChecked,
  onPress,
  color,
  linkText,
  linkText2,
  linkPress,
  linkPress2,
  linkColor,
  hasUnderline,
  style
}) => (
    <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
      <View style={styles.cbx}>
        {isChecked && (
          <Icon name="check" color={colors.purple} size={fontScale(23)} />
        )}
      </View>
      <View style={{ alignSelf: 'center' }}>
        {linkText ? (
          <View style={{ flexDirection: 'column' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GenericTextComponent text={text} color={color} />
              <TextLinkButtonComponent
                styleguideItem={GenericTextComponent.StyleguideItem.LINK}
                text={linkText}
                color={linkColor}
                onPress={linkPress}
              />
              <GenericTextComponent text={text2} color={color} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextLinkButtonComponent
                styleguideItem={GenericTextComponent.StyleguideItem.LINK}
                text={linkText2}
                color={linkColor}
                onPress={linkPress2}
              />
            </View>
          </View>
        ) : (
            <GenericTextComponent text={text} color={color} />
          )}
      </View>
    </TouchableOpacity>
  );

GenericCheckboxComponent.defaultProps = {
  color: colors.black,
  linkColor: colors.orangeYellow,
  hasUnderline: false,
  style: {}
};

GenericCheckboxComponent.propTypes = {
  text: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  color: PropTypes.string,
  linkText: PropTypes.string,
  linkText2: PropTypes.string,
  linkColor: PropTypes.string,
  hasUnderline: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: horizontalScale(32)
  },
  cbx: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.purple,
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: 6,
    marginRight: horizontalScale(16)
  }
});
