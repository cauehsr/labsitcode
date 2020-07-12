import React from 'react';
import { View, Platform } from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import { verticalScale } from 'labsitcode/src/commons/scaling';


export default class RegisterConfirmEmailScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      isModalScreen: true,
      rightButtonType: BaseScene.RightButtonType.TEXT_BUTTON,
      linkButtonText: 'help',
      onRightButtonPress: () => this.goToHelpMenuScene(),
      ...props
    });

    this.state = {
      loading: false,
      email: props.email
    };

    this.emailField = React.createRef();
    this.passwordField = React.createRef();

    this.navigationPop = () => this.dismissModal(true);

  }

  goToHelpMenuScene = () => {
    const { email } = this.state;
    this.navigationModal(
      this.screen.HelpMenuScene,
      this.animationType.MODALSLIDERIGHTTOLEFT,
      { email }
    );
  };

  onLoginScene = () => {
    this.navigationModal(
      this.screen.LoginScene,
      this.animationType.MODALSLIDERIGHTTOLEFT
    );
  };

  render() {
    const { loading, email } = this.state;

    return super.render(
      <>
        <View
          style={{
            flex: 2
          }}
        >
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.HEADINGL}
            color={colors.black}
            text={'confirmEmail'}
            marginBottom={verticalScale(17)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
            text={'infoConfirmEmail'}
            color={colors.gray}
          />
          <View
            style={{
              marginTop: this.isIOS ? verticalScale(40) : verticalScale(5)
            }}
          />
        </View>

        <View style={{ flex: 3 }}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
            text={'accessEmail'}
            color={colors.midnightBlack50}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
            text={email}
            color={colors.purple}
            marginTop={verticalScale(5)}
            marginBottom={verticalScale(5)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
            text={'clickConfirmEmail'}
            color={colors.midnightBlack50}
          />
        </View>

        <View style={{ flex: Platform.OS === 'ios' ? 0.5 : 1 }}>
          <GenericButtonComponent
            buttonColor={colors.purple}
            textColor={colors.white}
            text={'buttonConfirmEmail'}
            onPress={() => this.onLoginScene()}
            loading={loading}
          />
        </View>
      </>
    );
  }
}
