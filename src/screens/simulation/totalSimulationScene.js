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
import {registerLoginStack} from 'labsitcode/src/screens';

export default class TotalSimulationScene extends BaseScene {
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
      age: props.age,
      gender: props.gender,
      weight: props.weight,
      height: props.height,
      chronicDisease: props.chronicDisease,
      smoke: props.smoke,
      parentsDisease: props.parentsDisease,
      cholesterol: props.cholesterol,
      pressure: props.pressure,
      imc: props.imc,
    };

    this.emailField = React.createRef();
    this.passwordField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);
    this.postService = new PostService();

    this.photoUrl = props.photoUrl;

    console.log(Store.getState().userReducer);
    console.log(props);
  }

  onStarOnboarding = () => {};

  render() {
    const {
      loading,
      name,
      age,
      gender,
      email,
      cpf,
      cellPhone,
      weight,
      height,
      chronicDisease,
      smoke,
      parentsDisease,
      cholesterol,
      pressure,
      imc,
    } = this.state;

    return super.render(
      <View
        style={{
          flex: 2,
          backgroundColor: colors.white,

          paddingHorizontal: horizontalScale(24),
        }}>
        <View style={styles.cropImage}>
          <Image style={styles.loadingIcon} source={{uri: this.photoUrl}} />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK20}
            text={`Seja Bem Vindo\n${name} `}
            color={colors.midnightBlack}
          />
        </View>
        <View style={{flex: 1.6}}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
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
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Idade: ${age}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Email: ${email}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`CPF: ${cpf}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Telefone: ${cellPhone}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Peso: ${weight}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Altura: ${height}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Doença crônica: ${chronicDisease}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Parente próximo com problema cardiáco: ${parentsDisease}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Colesterol: ${cholesterol}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Pressão arteira sistólica: ${pressure}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`Fuma: ${smoke}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={`IMC: ${imc}`}
            color={colors.black}
            marginBottom={verticalScale(5)}
          />
        </View>
        <View style={{flex: Platform.OS === 'ios' ? 0.4 : 0.8}}>
          <GenericButtonComponent
            buttonColor={colors.purple}
            textColor={colors.white}
            text={'ENCERRAR TESTE'}
            onPress={() => registerLoginStack()}
            loading={loading}
          />
        </View>
      </View>,
    );
  }
}

const styles = StyleSheet.create({
  loadingIcon: {
    width: Platform.OS === 'ios' ? horizontalScale(120) : horizontalScale(130),
    height: Platform.OS === 'ios' ? verticalScale(120) : verticalScale(150),
    marginTop: verticalScale(6),
    borderRadius: Platform.OS === 'ios' ? 250 : 1500,
    borderWidth: 2,
    borderColor: colors.purple,
    marginRight: horizontalScale(10),
    resizeMode: 'cover',
  },
  cropImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: Platform.OS === 'ios' ? verticalScale(20) : verticalScale(60),
  },
  logo: {
    marginTop: verticalScale(20),
    width: horizontalScale(150),
    height: verticalScale(40),
    resizeMode: 'contain',
  },
  photoScan: {
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height / 1.15
        : Dimensions.get('window').height,
  },
});
