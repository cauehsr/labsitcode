/* eslint-disable import/prefer-default-export */
import React from 'react';
import {View, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {
  verticalScale,
  horizontalScale,
  fontScale,
} from 'labsitcode/src/commons/scaling';
import colors from 'labsitcode/src/commons/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {GenericTopBarComponent} from './genericTopBarComponent';

const TopBarType = {
  GENERIC_TOP_BAR: 'GENERIC_TOP_BAR',
};

export const TopBarComponent = ({
  topBarType,
  onBackButtonPress,
  linkButtonText,
  rightButtonType,
  onRightButtonPress,
  searchPlaceholder,
  onSearchTextHandle,
  onTextEndPress,
  onFocus,
  autoFocus,
  wordToSearch,
  onLogoPress,
  onPressProfile,
  userInfo,
}) => {
  return (
    <GenericTopBarComponent
      onBackButtonPress={onBackButtonPress}
      rightButtonType={rightButtonType}
      onRightButtonPress={onRightButtonPress}
      linkButtonText={linkButtonText}
    />
  );
};

TopBarComponent.TopBarType = TopBarType;

TopBarComponent.defaultProps = {
  topBarType: TopBarType.GENERIC_TOP_BAR,
};

TopBarComponent.propTypes = {
  topBarType: PropTypes.oneOf(Object.keys(TopBarType)),
  linkButtonText: PropTypes.string,
  rightButtonType: PropTypes.string,
  autoFocus: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  wordToSearch: PropTypes.string,
  userInfo: PropTypes.objectOf(PropTypes.any),
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(24),
    borderBottomWidth: 0.2,
    backgroundColor: colors.white,
    borderBottomColor: colors.gray,
  },
});
