import React from 'react';
import {View, Keyboard, Platform, Dimensions} from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent,
  TextLinkButtonComponent,
  GenericCheckboxComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import FadeComponent from 'labsitcode/src/components/container/animations/fadeComponent';
import DefaultFormViewComponent from 'labsitcode/src/components/container/defaultFormViewComponent';
import {verticalScale} from 'labsitcode/src/commons/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class RegisterPasswordScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      showBackButton: true,
      ...props,
    });

    this.state = {
      password: '',
      passwordConfirm: '',
      errorMessage: '',
      valid: false,
      termsCbxChecked: false,
      loading: false,
      showButton: false,
      erro: false,
      erroConfirm: false,
      disabled: true,
      showConfirmButton: false,
    };

    this.passwordField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);

    this.name = props.name;
    this.email = props.email;
    this.birthdate = props.birthdate;
    this.cpf = props.cpf;
    this.cellPhone = props.cellPhone;
  }


    onPressSignUp = () => {
    this.navigationModal(
      this.screen.ResgiterWelcomeScene,
      this.animationType.MODALSLIDERIGHTTOLEFT,
      {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        cellPhone: this.cellPhone,
        birthdate: this.birthdate,
      },
    );
  };

  onValidateLength = () => {
    const {password} = this.state;

    if (password.length >= 6) {
      this.setState(
        {
          erro: false,
          errorMessage: '',
          showButton: true,
        },
        () => this.passwordField.current.focusTextInput(),
      );
    } else {
      this.setState({
        erro: true,
        errorMessage: 'A senha deve ter pelo menos 6 digitos',
      });
    }
  };

  validatePassword = (passwordConfirm) => {
    const {password} = this.state;
    this.setState({passwordConfirm});
    if (password !== passwordConfirm) {
      this.setState({
        erroConfirm: true,
        errorMessage: 'Sua senha deve ser igual',
      });
    } else {
      Keyboard.dismiss();
      this.setState({
        valid: true,
        erroConfirm: false,
        errorMessage: '',
      });
    }
  };

  render() {
    const {
      password,
      passwordConfirm,
      erro,
      erroConfirm,
      termsCbxChecked,
      valid,
      loading,
      showButton,
      errorMessage,
      disabled,
      showConfirmButton,
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
                marginTop: this.isIOS ? verticalScale(40) : verticalScale(5),
              }}>
              <DefaultFormViewComponent
                value={password}
                valid={valid}
                errorMessage={errorMessage}
                placeholderText={'Senha'}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                error={erro}
                onBlur={() => this.onValidateLength()}
                onChangeText={(value) => this.setState({password: value})}
                lineBar
                returnKeyType="next"
              />
              {!erro && !showButton && (
                <GenericTextComponent
                  styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                  text={'A senha deve ter pelo menos 6 digitos'}
                  color={colors.gray01}
                />
              )}
              {!!showButton && (
                <DefaultFormViewComponent
                  ref={this.passwordField}
                  value={passwordConfirm}
                  valid={valid}
                  errorMessage={errorMessage}
                  placeholderText={'Confirmar Senha'}
                  autoCorrect={false}
                  autoCapitalize="none"
                  secureTextEntry
                  error={erroConfirm}
                  onChangeText={(value) => this.validatePassword(value)}
                  lineBar
                />
              )}
            </View>

            <FadeComponent
              type={FadeComponent.FadeType.FADEIN}
              autoPlay
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex:  Platform.OS === 'android' ? 0.5 : 0.8,
                marginBottom: Platform.OS === 'android' ? verticalScale(20) : 0,
              }}>
              <>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: verticalScale(30),
                  }}>
                  <GenericCheckboxComponent
                    text={'Eu aceito os'}
                    linkText={'Termos de Serviço'}
                    text2={'e com as'}
                    linkText2={'Políticas de Privacicade da labsitcode'}
                    isChecked={termsCbxChecked}
                    linkColor={colors.purple}
                    linkPress={() =>
                      this.navigationModal(
                        this.screen.TermsServiceScene,
                        this.animationType.MODALSLIDERIGHTTOLEFT,
                      )
                    }
                    linkPress2={() =>
                      this.navigationModal(
                        this.screen.TermsPrivacyScene,
                        this.animationType.MODALSLIDERIGHTTOLEFT,
                      )
                    }
                    onPress={() =>
                      this.setState((prevState) => ({
                        termsCbxChecked: !prevState.termsCbxChecked,
                        disabled: termsCbxChecked,
                      }))
                    }
                  />
                </View>
                <GenericButtonComponent
                  buttonColor={colors.purple}
                  textColor={colors.white}
                  text={'CONCLUIR'}
                  onPress={() => this.onPressSignUp()}
                  loading={loading}
                  disabled={disabled}
                />
              </>
            </FadeComponent>
          </View>
        </FadeComponent>
      </KeyboardAwareScrollView>,
    );
  }
}
