/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import colors from 'labsitcode/src/commons/colors';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { fontScale } from 'labsitcode/src/commons/scaling';
import { GenericTextComponent } from './genericTextComponent';

export const TextLinkButtonComponent = ({
  styleguideItem,
  text,
  color,
  opacity,
  textAlign,
  onPress,
  style,
  numberOfLines,
  arrowRight,
  loading,
  icon
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View
        style={
          !!icon && {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }
      >
        {!!icon && <Icon name={icon} size={fontScale(40)} color={color} />}
        {!loading && (
          <GenericTextComponent
            styleguideItem={styleguideItem}
            text={text}
            color={color}
            numberOfLines={numberOfLines}
            opacity={opacity}
            textAlign={textAlign}
          />
        )}
      </View>
      {!!arrowRight && (
        <Icon name="arrow-right" size={fontScale(40)} color={color} />
      )}
      {!!loading && (
        <ActivityIndicator size="small" color={colors.blackAlpha50} />
      )}
    </TouchableOpacity>
  );
};

TextLinkButtonComponent.defaultProps = {
  styleguideItem: GenericTextComponent.StyleguideItem.BODY,
  text: '',
  color: colors.black,
  opacity: 1,
  textAlign: 'left',
  style: {},
  arrowRight: false,
  loading: false
};

TextLinkButtonComponent.propTypes = {
  styleguideItem: PropTypes.oneOf(
    Object.keys(GenericTextComponent.StyleguideItem)
  ),
  text: PropTypes.string,
  opacity: PropTypes.number,
  arrowRight: PropTypes.bool,
  icon: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  numberOfLines: PropTypes.number,
  loading: PropTypes.bool
};
