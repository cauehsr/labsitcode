import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import thanksIcon from 'labsitcode/src/assets/img/icon-thanks.png';
import Store from 'labsitcode/src/store';
import {verticalScale, horizontalScale} from 'labsitcode/src/commons/scaling';
import LottieView from 'lottie-react-native';
import {saveUserLoginData} from 'labsitcode/src/actions';
import {storeUserData} from 'labsitcode/src/store/tokenLocalStore';

export default class ResgiterWelcomeScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITESCROLLVIEWVIEW,
      removeInnerPadding: true,
      isModalScreen: true,
      ...props,
    });

    this.state = {
      loading: false,
      name: props.name,
    };

    this.emailField = React.createRef();
    this.passwordField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);

    this.email = props.email;
    this.name = props.name;
    this.cpf = props.cpf;
    this.cellPhone = props.cellPhone;
  }

  onStarOnboarding = () => {
    storeUserData({
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      cellPhone: this.cellPhone,
    });
    Store.dispatch(
      saveUserLoginData({
        name: this.name,
        cpf: this.cpf,
        email: this.email,
        cellPhone: this.cellPhone,
      }),
    );
    this.navigationModal(
      this.screen.SelfieScanScene,
      this.animationType.MODALSLIDERIGHTTOLEFT,
    );
  };

  render() {
    const {loading, name} = this.state;

    return super.render(
      <View
        style={{
          flex: 2,
          backgroundColor: colors.white,
          paddingHorizontal: horizontalScale(24),
        }}>
        <View style={{flex: 1.8}}>
          <LottieView
            style={styles.loadingIcon}
            source={require('labsitcode/src/config/lottie/family.json')}
            autoPlay
            loop
          />
        </View>
        <View style={{flex: 2}}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
            text={`${'Obrigado'} ${name}!`}
            color={colors.midnightBlack}
            marginBottom={verticalScale(15)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.HEADING16}
            text={'Agora você faz parte da labsitcode :)'}
            color={colors.gray}
            marginBottom={verticalScale(15)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK20}
            text={
              'Comece agora uma simulação para saber como está a sua qualidade de vida.'
            }
            color={colors.purple}
          />
        </View>

        <View style={{flex: Platform.OS === 'ios' ? 0.6 : 0.7}}>
          <GenericButtonComponent
            buttonColor={colors.purple}
            textColor={colors.white}
            text={'COMEÇAR'}
            onPress={() => this.onStarOnboarding()}
            loading={loading}
          />
        </View>
      </View>,
    );
  }
}

const styles = StyleSheet.create({
  loadingIcon: {
    marginTop: verticalScale(20),
    height: Platform.OS === 'ios' ? verticalScale(200) : verticalScale(250),
  },
});
