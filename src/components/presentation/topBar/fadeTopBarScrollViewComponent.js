/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import colors from 'labsitcode/src/commons/colors';
import { horizontalScale, verticalScale } from 'labsitcode/src/commons/scaling';
import PropTypes from 'prop-types';
import { TopBarComponent } from './topBarComponent';
import { CustomStatusBar } from '..';

const SCROLL_HEIGHT = verticalScale(120);

export const FadeTopBarScrollViewComponent = ({
  onBackButtonPress,
  disableTopBarButtons,
  childContent,
  fixTopBar
}) => {
  const nScroll = new Animated.Value(0);
  const scroll = new Animated.Value(0);

  nScroll.addListener(
    Animated.event([{ value: scroll }], { useNativeDriver: false })
  );

  const reverseOpacityControl = nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityControl = nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const yControl = nScroll.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topBarContainer,
          {
            transform: [
              { translateY: fixTopBar ? 0 : yControl > 0 ? 0 : yControl },
              { perspective: 1000 }
            ],
            opacity: fixTopBar ? 1 : reverseOpacityControl
          }
        ]}
      >
        <CustomStatusBar />
        <TopBarComponent
          topBarType={TopBarComponent.TopBarType.SIMPLE_TOP_BAR}
          onBackButtonPress={onBackButtonPress}
        />
      </Animated.View>
      {!disableTopBarButtons && (
        <Animated.View
          style={[styles.defaultTopBarContainer, { opacity: opacityControl }]}
        >
          <TopBarComponent
            topBarType={TopBarComponent.TopBarType.GENERIC_TOP_BAR}
            onBackButtonPress={onBackButtonPress}
            buttonColor={colors.veryLightPink}
          />
        </Animated.View>
      )}
      <Animated.ScrollView
        bounces={false}
        style={styles.scrollViewContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: nScroll } } }],
          {
            useNativeDriver: true
          }
        )}
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.animatedChildView}>{childContent}</View>
      </Animated.ScrollView>
    </View>
  );
};

FadeTopBarScrollViewComponent.propTypes = {
  disableTopBarButtons: PropTypes.bool,
  childContent: PropTypes.element,
  fixTopBar: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  defaultTopBarContainer: {
    backgroundColor: colors.white,
    paddingLeft: horizontalScale(32),
    paddingRight: horizontalScale(32)
  },
  topBarContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 0
  },
  animatedChildView: {
    height: '100%',
    backgroundColor: colors.white,
    marginTop: verticalScale(42)
  }
});
