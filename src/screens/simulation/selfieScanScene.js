import React from 'react';
import {View, Platform, StyleSheet, Dimensions, Image} from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import {verticalScale, horizontalScale} from 'labsitcode/src/commons/scaling';
import LottieView from 'lottie-react-native';
import DocumentCameraViewComponent from 'labsitcode/src/components/container/documentCameraViewComponent';
import FadeComponent from 'labsitcode/src/components/container/animations/fadeComponent';
import PostService from 'labsitcode/src/services/postService';
import base64ToArrayBuffer from 'base64-arraybuffer';

export default class SelfieScanScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      removeInnerPadding: true,
      removeInnerMargin: true,
      showBackButton: true,
      isModalScreen: true,
      ...props,
    });

    this.state = {
      reloadScreen: false,
      showModal: false,
      photo_data: '',
      face_data: '',
      name: props.name,
    };

    this.emailField = React.createRef();
    this.passwordField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);
    this.postService = new PostService();

    this.email = props.email;
  }

  onStarOnboarding = () => {};

  documentModalCallback = () =>
    this.setState({showModal: true}, () => this.reloadCameraCallback());

  reloadCameraCallback = () =>
    this.setState({reloadScreen: true}, () => this.onBackCallback());

  detectFaces = () => {
    const {photo_data} = this.state;
    const selfie_ab = base64ToArrayBuffer.decode(photo_data.base64);
    this.postService
      .postImage(selfie_ab)
      .then((res) => {
        this.setState({loading: false});
        this.navigationModal(
          this.screen.CropSelfieScene,
          this.animationType.MODALSLIDERIGHTTOLEFT,
          {
            face_data: res.data[0].faceAttributes,
            photoUrl: photo_data.uri,
          },
        );
      })
      .catch((error) => {
        console.log(error);

        console.log('iioioo', error.response);
        alert(
          'Sorry, the request failed. Please try again.' +
            JSON.stringify(error),
        );
      });
  };

  render() {
    const {loading, reloadScreen} = this.state;

    return super.render(
      !reloadScreen ? (
        <View
          style={{
            flex: 2,
            backgroundColor: colors.white,

            paddingHorizontal: horizontalScale(24),
          }}>
          <View style={{flex: 2.5}}>
            <LottieView
              style={styles.loadingIcon}
              source={require('labsitcode/src/config/lottie/scan-face.json')}
              autoPlay
              loop
            />
          </View>
          <View style={{flex: 1}}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
              text={'Hora da foto!'}
              color={colors.midnightBlack}
              marginBottom={verticalScale(15)}
            />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADING16}
              text={
                'Precisamos de uma foto sua para scanear\ne calcular sua idade e seu gênero'
              }
              color={colors.purple}
              marginBottom={verticalScale(15)}
            />
          </View>

          <View style={{flex: 1.2}}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADING16}
              text={'Para melhores resultados'}
              color={colors.midnightBlack}
              marginBottom={verticalScale(10)}
            />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
              text={
                '- Remover os óculos\n - Amarrar o cabelo se for comprido\n - Alinhe seu rosto para preencher o contorno oval\n - Evite luzes brilhantes atrás de você'
              }
              color={colors.midnightBlack}
              marginBottom={verticalScale(15)}
            />
          </View>

          <View style={{flex: Platform.OS === 'ios' ? 0.7 : 0.8}}>
            <GenericButtonComponent
              buttonColor={colors.purple}
              textColor={colors.white}
              text={'COMEÇAR SCAN '}
              onPress={() => {
                this.containerType = null;
                this.setState({reloadScreen: true});
                this.forceUpdate();
              }}
              loading={loading}
            />
          </View>
        </View>
      ) : (
        <FadeComponent
          type={FadeComponent.FadeType.FADEIN}
          autoPlay
          style={styles.photoScan}>
          <DocumentCameraViewComponent
            onImageTakenPress={(image) =>
              this.setState(
                {reloadScreen: false, loading: true, photo_data: image},
                () => {
                  this.containerType =
                    BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW;
                  this.forceUpdate();
                  this.detectFaces();
                },
              )
            }
            reloadScreen={reloadScreen}
            onCameraCancel={() => {
              this.containerType =
                BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW;
              this.forceUpdate();
              this.setState({reloadScreen: false});
            }}
          />
        </FadeComponent>
      ),
    );
  }
}

const styles = StyleSheet.create({
  loadingIcon: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    width: 300,
    height: Platform.OS === 'ios' ? verticalScale(200) : verticalScale(250),
  },
  photoScan: {
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height / 1.15
        : Dimensions.get('window').height,
  },
});
