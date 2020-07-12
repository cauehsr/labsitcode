import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from 'labsitcode/src/commons/colors';
import { fontScale } from 'labsitcode/src/commons/scaling';

const { width, height } = Dimensions.get('window');

const MT = Platform.OS === 'android' ? 0 : 20;

export const GenericModalComponent = props => {
  const { isVisible, onClose, distanceFromTop, children, colorModal } = props;

  const topSpace = MT + distanceFromTop;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => onClose()}
        style={{
          height: height - topSpace,
          marginTop: topSpace,
          backgroundColor: colors.pumpkinRed,
          borderWidth: 6
        }}
      >
        <View style={styles.styleOpacity}>
          <View style={[styles.iconClose, { top: topSpace + 20 }]}>
            {onClose && (
              <TouchableOpacity onPress={() => onClose()}>
                <Icon name="times" color={colors.white} size={fontScale(20)} />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={[
              styles.scrollContainer,
              { marginTop: topSpace, backgroundColor: colorModal }
            ]}
          >
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

GenericModalComponent.defaultProps = {
  isVisible: false,
  colorModal: colors.white
};

GenericModalComponent.propTypes = {
  isVisible: PropTypes.bool,
  distanceFromTop: PropTypes.number,
  colorModal: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute'
  },
  scrollContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto'
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8
  },
  iconClose: {
    zIndex: 2,
    position: 'absolute',
    right: 12
  },
  touchableAction: {
    height: 64,
    width: width - 64,
    borderRadius: 8,
    justifyContent: 'center'
  },
  styleOpacity: {
    flex: 1,
    backgroundColor: colors.midnightBlack50
  }
});

export default GenericModalComponent;
