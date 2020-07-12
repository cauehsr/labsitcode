import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import colors from 'labsitcode/src/commons/colors';
import {
  verticalScale,
  fontScale,
  horizontalScale,
} from 'labsitcode/src/commons/scaling';
import {GenericTextComponent} from 'labsitcode/src/components/presentation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {RNCamera} from 'react-native-camera';
import {Svg, Defs, Rect, Mask, Ellipse} from 'react-native-svg';

export default class DocumentCameraViewComponent extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      loading: false,
    };
  }

  render() {
    const {
      title,
      onImageTakenPress,
      onCameraCancel,
      reloadScreen,
      onBackPress,
    } = this.props;
    const {loading} = this.state;

    return (
      <View style={{flex: 1}}>
        {!!reloadScreen && (
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={{flex: 1}}
            onStatusChange={({cameraStatus}) =>
              cameraStatus !== RNCamera.Constants.CameraStatus.READY &&
              onCameraCancel()
            }
            type={RNCamera.Constants.Type.front}
            autoFocus={RNCamera.Constants.AutoFocus.on}
          />
        )}
        <View style={styles.containerOverlay}>
          <View style={styles.ovalFrameOverlay}>
            <View style={{aspectRatio: 1, flex: 1}}>
              <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Defs>
                  <Mask id="mask" x="0" y="0" height="100%" width="100%">
                    <Rect height="100%" width="100%" fill="#fff" />
                    <Ellipse cx="27" cy="45" rx="19" ry="25" fill="red" />
                  </Mask>
                </Defs>
                <Ellipse
                  cx="27"
                  cy="45"
                  rx="19"
                  ry="25"
                  stroke="#fff"
                  strokeWidth="0.5"
                  fill="transparent"
                />
                <Rect
                  height="100%"
                  width="100%"
                  fill="black"
                  mask="url(#mask)"
                  fillOpacity="0.5"
                />
              </Svg>
            </View>
          </View>
          <View style={styles.assetsContainer}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                style={{flex: 0.1, alignSelf: 'flex-start'}}
                onPress={onCameraCancel}>
                <Icon
                  name="times"
                  size={fontScale(35)}
                  color={colors.white}
                />
              </TouchableOpacity>
              <View style={{flex: 0.8, alignItems: 'center'}}>
                <GenericTextComponent
                  styleguideItem={GenericTextComponent.StyleguideItem.BODY}
                  color={colors.white}
                  text={title}
                  marginTop={verticalScale(9)}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                alignItems: 'center',
                marginBottom: Platform.OS === 'ios' ? 0 : verticalScale(30),
              }}>
              <TouchableOpacity
                style={styles.pictureButton}
                disabled={loading}
                onPress={async () => {
                  this.setState({loading: true});
                  if (this.camera) {
                    const data = await this.camera.takePictureAsync({
                      fixOrientation: true,
                      forceUpOrientation: true,
                      orientation: 'portrait',
                      base64: true
                    });
                    this.setState({loading: false}, () =>
                      onImageTakenPress(data),
                    );
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  blackFrameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    borderColor: colors.midnightBlack50,
    borderLeftWidth: horizontalScale(32),
    borderRightWidth: horizontalScale(32),
    borderTopWidth: horizontalScale(96),
    borderBottomWidth: horizontalScale(180),
  },
  ovalFrameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
  whiteFrameOverlay: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    width: horizontalScale(294),
    height: verticalScale(380),
    alignSelf: 'center',
  },
  assetsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 3,
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(32),
  },
  pictureButton: {
    width: 87,
    height: 87,
    borderRadius: 87,
    borderWidth: 7,
    backgroundColor: colors.white,
    borderColor: colors.brownGrey,
  },
});
