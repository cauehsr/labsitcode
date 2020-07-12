import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import BaseScene from 'labsitcode/src/screens/baseScene';
import {
  GenericTextComponent,
  GenericButtonComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import {verticalScale} from 'labsitcode/src/commons/scaling';

export default class WelcomeLoginScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.IMAGESCROLLVIEW,
      ...props,
    });

    this.state = {user: null, customState: null, loadingFacebook: false};

    this.navigationClose = () => {};
  }

  render() {
    return super.render(
      <View style={styles.container}>
        <View style={{flex: 0.5}} />

        <View style={{flex: 5, width: '70%'}}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
            color={colors.white}
            text={'O seguro de vida que '}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
            text={'recompensa suas atitudes saudáveis!'}
            color={colors.purple}
            marginBottom={verticalScale(10)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
            text={
              'Aqui o que conta é sua saúde e estilo de vida para um seguro com preço justo.'
            }
            color={colors.black}
            marginBottom={verticalScale(10)}
          />
        </View>
        <View style={{flex: Platform.OS === 'ios' ? 0.7 : 1.4}}>
          <View style={styles.buttons}>
            <GenericButtonComponent
              styleguideItem={GenericButtonComponent.StyleguideItem.HALFBUTTON}
              buttonColor="transparente"
              textColor={colors.white}
              boderColor={colors.white}
              text={'ENTRAR'}
              onPress={() =>
                this.navigationModal(
                  this.screen.LoginScene,
                  this.animationType.MODALSLIDERIGHTTOLEFT,
                )
              }
            />
            <GenericButtonComponent
              styleguideItem={GenericButtonComponent.StyleguideItem.HALFBUTTON}
              buttonColor={colors.purple}
              boderColor={colors.purple02}
              textColor={colors.white}
              text={'CADASTRAR'}
              onPress={() =>
                this.navigationModal(
                  this.screen.RegisterNameScene,
                  this.animationType.MODALSLIDERIGHTTOLEFT,
                )
              }
            />
          </View>
        </View>
      </View>,
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: verticalScale(50),
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lineItems: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  facebook: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLoading: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    width: '100%',
    height: 200,
  },
  lineItem: {
    height: 1,
    backgroundColor: colors.white,
    width: '40%',
  },
});
