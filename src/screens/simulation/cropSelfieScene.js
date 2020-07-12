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
import Store from 'labsitcode/src/store';

export default class CropSelfieScene extends BaseScene {
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
      name: Store.getState().userReducer
        ? Store.getState().userReducer.name
        : '',
      cellPhone: Store.getState().userReducer
        ? Store.getState().userReducer.cellPhone
        : '',
      cpf: Store.getState().userReducer ? Store.getState().userReducer.cpf : '',
      email: Store.getState().userReducer
        ? Store.getState().userReducer.email
        : '',
        age: props.face_data ? props.face_data.age : '',
        gender:  props.face_data ? props.face_data.gender : '',
    };

    this.emailField = React.createRef();
    this.passwordField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);
    this.postService = new PostService();

    this.email = props.email;
    this.face_data = props.face_data;
    this.photoUrl = props.photoUrl;

    console.log(Store.getState().userReducer);
  }

  onStarOnboarding = () => {};

  render() {
    const {loading, name, age, gender, email, cpf, cellPhone} = this.state;

    return super.render(
      <View
        style={{
          flex: 2,
          backgroundColor: colors.white,

          paddingHorizontal: horizontalScale(24),
        }}>
        <View style={styles.cropImage}>
          <Image style={styles.loadingIcon} source={{uri: this.photoUrl}} />
        </View>
        <View style={{flex: Platform.OS === 'ios' ?  1.6 : 2}}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
            text={`Olá ${name} `}
            color={colors.midnightBlack}
            marginBottom={verticalScale(15)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK20}
            text={`Genêro: ${
              gender === 'male'
                ? 'Masculino'
                : gender === 'female'
                ? 'Feminino'
                : ''
            }`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK20}
            text={`Idade: ${age}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK20}
            text={`Email: ${email}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK20}
            text={`CPF: ${cpf}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK20}
            text={`Telefone: ${cellPhone}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
        </View>

        <View style={{flex: Platform.OS === 'ios' ? 0.7 : 0.8}}>
          <GenericButtonComponent
            buttonColor={colors.purple}
            textColor={colors.white}
            text={'CONTINUAR SIMULAÇÃO'}
            onPress={() =>
              this.navigationModal(
                this.screen.ImcScene,
                this.animationType.MODALSLIDERIGHTTOLEFT,
                {
                  age,
                  gender,
                  photoUrl: this.photoUrl,
                },
              )
            }
            loading={loading}
          />
        </View>
      </View>,
    );
  }
}

const styles = StyleSheet.create({
  loadingIcon: {
    width: Platform.OS === 'ios' ? horizontalScale(360) : horizontalScale(300),
    height: Platform.OS === 'ios' ? verticalScale(360) : verticalScale(380),
    marginTop: verticalScale(6),
    alignSelf: 'center',
    borderRadius: Platform.OS === 'ios' ? 250 : 1500,
    borderWidth: 4,
    borderColor: colors.purple,
    resizeMode: 'cover',
  },
  cropImage: {
    flex: 2.5,
    alignSelf: 'center',
    marginTop: verticalScale(40),
    marginBottom: Platform.OS === 'ios' ? verticalScale(20) : verticalScale(60),
  },
  photoScan: {
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height / 1.15
        : Dimensions.get('window').height,
  },
});
