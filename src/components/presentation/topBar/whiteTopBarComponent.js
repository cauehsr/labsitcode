/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  horizontalScale,
  fontScale,
  verticalScale
} from 'labsitcode/src/commons/scaling';
import colors from 'labsitcode/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';

export const WhiteTopBarComponent = React.forwardRef(
  (
    {
      onBackButtonPress,
      onCloseButtonPress,
      titleText,
      onTitlePress,
      boldTitle,
      onlyText,
      wordToSearch,
      onTextEndPress
    },
    ref
  ) => (
    <View
      style={[
        styles.topBarItensContainer,
        !boldTitle ||
          (!onlyText && {
            borderBottomWidth: 1,
            borderBottomColor: colors.blackAlpha12
          })
      ]}
    >
      <View style={styles.topBarItemLeftContainer}>
        {!!onBackButtonPress && (
          <TouchableOpacity
            testID="btn.back"
            style={styles.buttonBack}
            onPress={onBackButtonPress}
          >
            <Icon
              name="Back"
              size={fontScale(40)}
              color={colors.veryLightPink}
            />
          </TouchableOpacity>
        )}
        {onTitlePress ? (
          <TouchableOpacity style={{ flex: 1 }} onPress={onTitlePress}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.BODY}
              color={colors.blackAlpha50}
              marginTop={verticalScale(8)}
              text={titleText}
            />
          </TouchableOpacity>
        ) : boldTitle ? (
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
            color={colors.black}
            numberOfLines={2}
            marginTop={verticalScale(8)}
            text={titleText}
          />
        ) : onlyText ? (
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
            color={colors.blackAlpha50}
            numberOfLines={1}
            marginTop={
              Platform.OS === 'ios' ? verticalScale(8) : verticalScale(5)
            }
            text={titleText}
          />
        ) : (
          <TextInput
            placeholder={titleText}
            ref={ref}
            placeholderTextColor={colors.blackAlpha30}
            allowFontScaling={false}
            value={wordToSearch}
            autoFocus
            style={styles.input}
            onSubmitEditing={onTextEndPress}
          />
        )}
      </View>
      <View style={styles.topBarItemRightContainer}>
        {!!onCloseButtonPress && (
          <TouchableOpacity
            testID="btn.xClose"
            style={styles.buttonClose}
            onPress={onCloseButtonPress}
          >
            <Icon
              name="times"
              size={fontScale(40)}
              color={colors.veryLightPink}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
);

WhiteTopBarComponent.propTypes = {
  titleText: PropTypes.string,
  boldTitle: PropTypes.bool,
  onlyText: PropTypes.bool,
  wordToSearch: PropTypes.string,
};

const styles = StyleSheet.create({
  topBarItensContainer: {
    flex: 0,
    paddingTop: horizontalScale(16),
    paddingBottom: horizontalScale(16),
    flexDirection: 'row'
  },
  topBarItemLeftContainer: {
    flex: 0.9,
    paddingLeft: horizontalScale(32),
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  topBarItemRightContainer: {
    flex: 0.1,
    paddingRight: horizontalScale(32),
    alignItems: 'flex-end'
  },
  buttonBack: {
    height: 40,
    width: 40,
    marginLeft: horizontalScale(-13),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonClose: {
    height: 40,
    width: 40,
    marginRight: horizontalScale(-13),
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: fontScale(18),
    marginTop: Platform.OS === 'ios' ? verticalScale(8) : verticalScale(5),
    padding: 0,
    color: colors.black
  }
});
