import React from 'react';
import {View, Dimensions, Platform} from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent,
  TextLinkButtonComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import FadeComponent from 'labsitcode/src/components/container/animations/fadeComponent';
import DefaultFormViewComponent from 'labsitcode/src/components/container/defaultFormViewComponent';
import {validateEmail} from 'labsitcode/src/commons/utils';
import {verticalScale} from 'labsitcode/src/commons/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


export default class LoginScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      isModalScreen: true,
      showBackButton: true,
      rightButtonType: BaseScene.RightButtonType.TEXT_BUTTON,
      ...props,
    });

    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
      valid: false,
      erroPass: false,
      loading: false,
      disabled: true,
    };

    this.emailField = React.createRef();
    this.passwordField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);
  }

  goToHelpMenuScene = () => {
    const {email} = this.state;
    this.navigationModal(
      this.screen.HelpMenuScene,
      this.animationType.MODALSLIDERIGHTTOLEFT,
      {email},
    );
  };

  onValidateEmail() {
    const {email} = this.state;
    const isValidEmail = validateEmail(email.trim());
    this.passwordField.current.focusTextInput();

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

  onValidateLength = () => {
    const {password} = this.state;

    if (password.length >= 6) {
      this.setState({
        errorPassword: '',
        disabled: false,
        validPassword: true,
        erroPass: false,
        showButton: true,
      });
    } else {
      this.setState({
        disabled: true,
        validPassword: false,
        erroPass: true,
        errorPassword: 'A senha deve ter pelo menos 6 digitos',
      });
    }
  };

  // onPressSignIn() {
  //   const { email, password } = this.state;

  //   const username = email.trim();

  //   this.setState({ loading: true });
  //   const isValidEmail = validateEmail(email.trim());

  //   if (isValidEmail) {
  //     this.setState({ valid: true, erro: false, disabled: false });
  //     Auth.signIn({
  //       username,
  //       password
  //     })
  //       .then(response => {
  //         const token = response.signInUserSession.accessToken.jwtToken;
  //         storeBearerToken(token);
  //         Store.dispatch(saveBearerToken(token));
  //         const id = response.username;
  //         const { attributes } = response;

  //         API.graphql(graphqlOperation(getUser, { id }))
  //           .then(({ data }) => {
  //             console.log(data);

  //             storeUserData({
  //               name: attributes.name,
  //               email: attributes.email,
  //               birthdate: attributes.birthdate,
  //               gender: attributes.gender,
  //               username: (data.getUser && data.getUser.username) || '',
  //               bio: (data.getUser && data.getUser.bio) || '',
  //               location: (data.getUser && data.getUser.location) || '',
  //               avatar: (data.getUser && data.getUser.avatar) || '',
  //               id: id || ''
  //             });
  //             Store.dispatch(
  //               saveUserLoginData({
  //                 name: attributes.name,
  //                 email: attributes.email,
  //                 birthdate: attributes.birthdate,
  //                 gender: attributes.gender,
  //                 username: (data.getUser && data.getUser.username) || '',
  //                 bio: (data.getUser && data.getUser.bio) || '',
  //                 location: (data.getUser && data.getUser.location) || '',
  //                 avatar: (data.getUser && data.getUser.avatar) || '',
  //                 id: id || ''
  //               })
  //             );

  //             if (data.getUser) {
  //               setTimeout(() => {
  //                 registerHomeStack(AnimationType.FADEROOT);
  //                 this.setState({ loading: false });
  //               }, 300);
  //             } else {
  //               this.navigationModal(
  //                 this.screen.ResgiterUserNameScene,
  //                 this.animationType.MODALSLIDERIGHTTOLEFT
  //               );
  //               this.setState({ loading: false });
  //             }
  //           })
  //           .catch(error => {
  //             console.log(error);
  //             this.setState({ loading: false });
  //           });
  //       })
  //       .catch(error => {
  //         this.setState({
  //           loading: false,
  //           valid: false,
  //           disabled: true,
  //           erro: true,
  //           validPassword: false,
  //           erroPass: true,
  //           errorPassword:
  //             error.code === 'NotAuthorizedException'
  //               ? 'wrongPassword'
  //               : error.code === 'UserNotFoundException'
  //                 ? 'wrongEmail'
  //                 : error.message
  //         });
  //       });
  //   } else {
  //     this.setState({
  //       loading: false,
  //       erro: true,
  //       valid: false,
  //       errorEmail: 'wrongEmail'
  //     });
  //   }
  // }

  render() {
    const {
      email,
      password,
      showButton,
      errorEmail,
      errorPassword,
      erro,
      erroPass,
      disabled,
      valid,
      validPassword,
      loading,
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
          <View style={{flex: 1}}>
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADINGL}
              color={colors.black}
              text={'Entrar'}
              marginBottom={verticalScale(17)}
            />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
              text={'Entre com suas informações de login,'}
              color={colors.gray}
            />
            <TextLinkButtonComponent
              styleguideItem={GenericTextComponent.StyleguideItem.LINK}
              text={'ou clique aqui para cadastrar-se'}
              onPress={() =>
                this.navigationModal(
                  this.screen.RegisterNameScene,
                  this.animationType.MODALSLIDERIGHTTOLEFT,
                )
              }
              color={colors.purple}
            />
            <View
              style={{
                marginTop: this.isIOS ? verticalScale(60) : verticalScale(70),
              }}>
              <DefaultFormViewComponent
                value={email.trim()}
                valid={valid}
                onChangeText={(value) => this.setState({email: value})}
                onBlur={() => {
                  this.onValidateEmail();
                }}
                title="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                errorMessage={errorEmail}
                error={erro}
                lineBar
                returnKeyType="next"
              />
              <View style={{marginTop: verticalScale(20)}} />
              <DefaultFormViewComponent
                ref={this.passwordField}
                value={password}
                valid={validPassword}
                title={'Senha'}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                onBlur={() => {
                  this.onValidateLength();
                }}
                errorMessage={errorPassword}
                error={erroPass}
                onChangeText={(value) => this.setState({password: value})}
                lineBar
              />
              <View
                style={{
                  alignSelf: 'flex-end',
                }}>
                <TextLinkButtonComponent
                  styleguideItem={GenericTextComponent.StyleguideItem.LINK}
                  text={'Esqueceu a senha?'}
                  onPress={() =>
                    this.navigationModal(
                      this.screen.RecoveryEmailScene,
                      this.animationType.MODALSLIDERIGHTTOLEFT,
                    )
                  }
                  color={colors.purple}
                />
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                bottom:
                  Platform.OS === 'ios' ? verticalScale(90) : verticalScale(50),
              }}>
              <GenericButtonComponent
                buttonColor={colors.purple}
                textColor={colors.white}
                text={'ENTRAR'}
                onPress={() => this.onPressSignIn()}
                loading={loading}
                disabled={disabled}
              />
            </View>
          </View>
        </FadeComponent>
      </KeyboardAwareScrollView>,
    );
  }
}
