/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  fontScale,
  verticalScale,
  horizontalScale,
} from 'labsitcode/src/commons/scaling';
import colors from 'labsitcode/src/commons/colors';
import {
  GenericTextComponent,
  TextLinkButtonComponent,
} from 'labsitcode/src/components/presentation';

const RightButtonType = {
  TEXT_BUTTON: 'TEXT_BUTTON',
  MENU_BUTTON: 'menu',
  IMAGE_BUTTON: 'add',
  labsitcode_BUTTON: 'logo',
  GALLERY_BUTTON: 'share',
  CONFIG_BUTTON: 'engrenagem',
  PROFILE_BUTTON: 'Grupo-647',
  GIPHY_BUTTON: 'giphy',
};

export const GenericTopBarComponent = ({
  onBackButtonPress,
  onRightButtonPress,
  rightButtonType,
  linkButtonText,
}) => {
  const renderRigthButton = () =>
    rightButtonType === RightButtonType.TEXT_BUTTON ? (
      <View style={{height: 40}}>
        <TextLinkButtonComponent
          styleguideItem={GenericTextComponent.StyleguideItem.LINK}
          text={linkButtonText}
          color={colors.purple}
          onPress={onRightButtonPress}
        />
      </View>
    ) : (
      <TouchableOpacity
        onPress={onRightButtonPress}
        style={
          rightButtonType === RightButtonType.GIPHY_BUTTON
            ? Platform.OS === 'ios'
              ? {width: '50%', height: 40}
              : {width: '55%', height: 30}
            : {height: 40}
        }>
          <Image
            style={{width: '100%', height: 30}}
            source={require('labsitcode/src/assets/img/giphy.gif')}
          />

      </TouchableOpacity>
    );

  return (
    <View style={styles.topBarItensContainer}>
      {onBackButtonPress ? (
        <TouchableOpacity
          style={{width: 100, height: 40}}
          onPress={onBackButtonPress}>
          <Icon
            name="arrow-left"
            size={fontScale(20)}
            color={colors.purple}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonBack} />
      )}
      {!!rightButtonType && renderRigthButton()}
    </View>
  );
};

GenericTopBarComponent.RightButtonType = RightButtonType;

GenericTopBarComponent.propTypes = {
  rightButtonType: PropTypes.oneOf(Object.keys(RightButtonType)),
  linkButtonText: PropTypes.string,
};

const styles = StyleSheet.create({
  topBarItensContainer: {
    flex: 0,
    height: verticalScale(10),
    marginTop: verticalScale(50),
    paddingHorizontal: horizontalScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  buttonBack: {
    width: 40,
    height: 50,
  },
});
