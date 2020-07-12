import React from 'react';
import {View, Platform, Dimensions} from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent,
  TextLinkButtonComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import FadeComponent from 'labsitcode/src/components/container/animations/fadeComponent';
import DefaultFormViewComponent from 'labsitcode/src/components/container/defaultFormViewComponent';
import {validateEmail, validateName} from 'labsitcode/src/commons/utils';
import {verticalScale} from 'labsitcode/src/commons/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class RegisterNameScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      isModalScreen: true,
      showBackButton: true,
      ...props,
    });

    this.state = {
      email: '',
      name: '',
      errorEmail: '',
      erroName: '',
      errorMessage: '',
      valid: false,
      errorName: false,
      validName: false,
      loading: false,
      showButton: false,
      disabled: true,
    };

    this.emailField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);
  }

  goBirthDate = () => {
    const {email, name} = this.state;
    this.navigationModal(
      this.screen.RegisterBirthdateScene,
      this.animationType.MODALSLIDERIGHTTOLEFT,
      {
        name,
        email: email.trim(),
      },
    );
  };

  onValidateName() {
    const {name} = this.state;
    const isValidName = validateName(name);

    if (isValidName) {
      this.setState({
        validName: true,
        errorName: false,
        erroName: '',
      });
      this.emailField.current.focusTextInput();
    } else {
      this.setState({
        errorName: true,
        valid: false,
        erroName: 'Nome obrigatório e precisa ter 3 letras',
      });
    }
  }

  onValidateEmail() {
    const {email} = this.state;
    const isValidEmail = validateEmail(email.trim());

    if (isValidEmail) {
      this.setState({
        valid: true,
        erro: false,
        showButton: true,
      });
    } else {
      this.setState({
        erro: true,
        valid: false,
        errorEmail: 'E-mail inválido ou E-mail não existe.',
      });
    }
  }

  render() {
    const {
      email,
      errorEmail,
      errorName,
      errorMessage,
      name,
      erro,
      erroName,
      valid,
      validName,
      loading,
      disabled,
    } = this.state;

    return super.render(
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={false}>
        <FadeComponent
          type={FadeComponent.FadeType.FADEIN}
          autoPlay
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
                marginTop: this.isIOS ? verticalScale(60) : verticalScale(70),
              }}>
              <DefaultFormViewComponent
                value={name}
                valid={validName}
                title={'Nome'}
                onChangeText={(value) => this.setState({name: value})}
                onBlur={() => {
                  this.onValidateName();
                }}
                lineBar
                returnKeyType="next"
                errorMessage={erroName}
                error={errorName}
              />
              <View style={{marginTop: verticalScale(20)}} />
              <DefaultFormViewComponent
                ref={this.emailField}
                value={email.trim()}
                valid={valid}
                title="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(value) => this.setState({email: value})}
                onBlur={() => {
                  this.onValidateEmail();
                }}
                errorMessage={errorEmail || errorMessage}
                error={erro}
                lineBar
              />
            </View>

            <FadeComponent
              type={FadeComponent.FadeType.FADEIN}
              autoPlay
              style={{flex: Platform.OS === 'ios' ? 0.9 : 0.8}}>
              <GenericButtonComponent
                buttonColor={colors.purple}
                textColor={colors.white}
                text={'AVANÇAR'}
                onPress={() => this.goBirthDate()}
                loading={loading}
                disabled={!(validName && valid)}
              />
            </FadeComponent>
          </View>
        </FadeComponent>
      </KeyboardAwareScrollView>,
    );
  }
}
