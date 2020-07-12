import React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent,
  TextLinkButtonComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import FadeComponent from 'labsitcode/src/components/container/animations/fadeComponent';
import DefaultFormViewComponent from 'labsitcode/src/components/container/defaultFormViewComponent';
import {verticalScale} from 'labsitcode/src/commons/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class RegisterBirthdateScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      showBackButton: true,
      ...props,
    });

    this.state = {
      errorMessage: '',
      cpf: '',
      cellPhone: '',
      valid: false,
      loading: false,
      disabled: true,
    };

    this.navigationPop = () => this.dismissModal(true);

    this.name = props.name;
    this.email = props.email;
  }

  goPassword = () => {
    const {cpf, cellPhone} = this.state;
    this.navigationModal(
      this.screen.RegisterPasswordScene,
      this.animationType.MODALSLIDERIGHTTOLEFT,
      {
        name: this.name,
        email: this.email,
        cpf,
        cellPhone,
      },
    );
  };

  render() {
    const {cpf, cellPhone, erro, loading} = this.state;

    return super.render(
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={false}>
        <FadeComponent
          type={FadeComponent.FadeType.FADEIN}
          autoPlay
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            minHeight:
              Platform.OS === 'ios'
                ? Dimensions.get('window').height / 1.18
                : Dimensions.get('window').height / 1.2,
            position: 'relative',
          }}>
          <View style={{flex: 2}}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADINGL}
              color={colors.black}
              text={'Cadastre-se'}
              marginBottom={verticalScale(17)}
            />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
              text={'Cadastre-se com suas informações abaixo,'}
              color={colors.gray}
            />
            <View style={{flexDirection: 'row'}}>
              <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                text={'caso já tenha cadastro '}
                color={colors.gray}
              />
              <TextLinkButtonComponent
                styleguideItem={GenericTextComponent.StyleguideItem.LINK}
                text={'clique aqui para entrar.'}
                color={colors.purple}
                onPress={() =>
                  this.navigationModal(
                    this.screen.LoginScene,
                    this.animationType.MODALSLIDERIGHTTOLEFT,
                  )
                }
              />
            </View>
            <View
              style={{
                flex: 3,
                marginTop: this.isIOS ? verticalScale(40) : verticalScale(5),
              }}>
              <DefaultFormViewComponent
                value={cpf}
                placeholderText={'CPF'}
                autoFocus
                onChangeText={(value) => this.setState({cpf: value})}
                type="cpf"
                lineBar
              />
              <DefaultFormViewComponent
                value={cellPhone}
                placeholderText={'Telefone'}
                onChangeText={(value) => this.setState({cellPhone: value})}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                lineBar
              />
              <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.TINY}
                text={
                  'É possivel alterar esta informação posteriormente\nem configurações'
                }
                color={colors.gray01}
                marginTop={verticalScale(15)}
              />
            </View>
            <FadeComponent
              type={FadeComponent.FadeType.FADEIN}
              autoPlay
              style={{flex: Platform.OS === 'ios' ? 0.7 : 0.8}}>
              <GenericButtonComponent
                buttonColor={colors.purple}
                textColor={colors.white}
                text={'AVANÇAR'}
                onPress={() => this.goPassword()}
                loading={loading}
              />
            </FadeComponent>
          </View>
        </FadeComponent>
      </KeyboardAwareScrollView>,
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGender: {
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayLight02,
    width: '48.5%',
    borderRadius: 5,
    paddingVertical: verticalScale(10),
  },

  buttonGenderActive: {
    borderColor: colors.purple,
  },
});
