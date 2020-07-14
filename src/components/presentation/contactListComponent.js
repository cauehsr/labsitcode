/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'labsitcode/src/commons/colors';
import {
  verticalScale,
  horizontalScale,
  fontScale,
} from 'labsitcode/src/commons/scaling';
import {GenericTextComponent} from 'labsitcode/src/components/presentation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';

export const ContactListComponent = (props) => {
  const {onPress, text, onPressFavorite, star} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <GenericTextComponent
          styleguideItem={GenericTextComponent.StyleguideItem.BODY}
          text={text}
          color={colors.white}
        />
        <TouchableOpacity style={styles.star} onPress={onPressFavorite}>
          {star ? (
            <LottieView
              style={styles.loadingIcon}
              source={require('labsitcode/src/config/lottie/start-animation.json')}
              autoPlay
              loop={false}
            />
          ) : (
            <Icon
              name="star"
              solid
              color={star ? colors.orange : colors.gray}
              size={fontScale(25)}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

ContactListComponent.defaultProps = {
  buttonColor: colors.pumpkinOrange,
  textColor: colors.white,
  text: '',
};

ContactListComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingOrange: PropTypes.bool,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(28),
    paddingHorizontal: horizontalScale(20),
    borderBottomWidth: 0.8,
    borderBottomColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  star: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(40),
    height: verticalScale(40),
  },
});
