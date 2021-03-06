/* eslint-disable import/prefer-default-export */
import React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {TextInputMask} from 'react-native-masked-text';
import colors from 'labsitcode/src/commons/colors';
import {verticalScale, fontScale} from 'labsitcode/src/commons/scaling';
import {GenericTextComponent} from './genericTextComponent';

export const TitleInputComponent = React.forwardRef((props, ref) => (
  <View>
    <GenericTextComponent
      styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
      color={colors.gray}
      text={props.titleText}
    />
    {props.type ? (
      <TextInputMask
        ref={ref}
        {...props}
        type={props.type}
        keyboardType="numeric"
        placeholder={props.placeholderText}
        placeholderTextColor={colors.white}
        allowFontScaling={false}
        style={styles.input}
      />
    ) : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {props.showAtSign && (
          <View
            style={{
              marginTop:
                Platform.OS === 'ios' ? verticalScale(10) : verticalScale(5),
            }}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
              color={colors.white}
              text="@"
            />
          </View>
        )}
        <TextInput
          ref={ref}
          {...props}
          placeholder={props.placeholderText}
          placeholderTextColor={colors.white}
          allowFontScaling={false}
          style={[styles.input, {color: props.inputColor}]}
        />
      </View>
    )}
  </View>
));

TitleInputComponent.defaultProps = {
  placeholderText: '',
  titleText: '',
  type: '',
  inputColor: colors.whitem,
};

TitleInputComponent.propTypes = {
  placeholderText: PropTypes.string,
  titleText: PropTypes.string,
  type: PropTypes.string,
  inputColor: PropTypes.string,
  showAtSign: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontFamily: 'Lato-Bold',
    fontSize: fontScale(24),
    marginTop: Platform.OS === 'ios' ? verticalScale(8) : verticalScale(5),
    padding: 0,
    color: colors.midnightBlack,
  },
});
