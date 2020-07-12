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
import {verticalScale, horizontalScale} from 'labsitcode/src/commons/scaling';
import LottieView from 'lottie-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class ImcScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      showBackButton: true,
      ...props,
    });

    this.state = {
      errorMessage: '',
      weight: '',
      height: '',
      chronicDisease: '',
      smoke: '',
      parentsDisease: '',
      cholesterol: '',
      pressure: '',
      valid: false,
      loading: false,
      disabled: true,
    };

    this.navigationPop = () => this.dismissModal(true);

    this.age = props.age;
    this.gender = props.gender;
    this.photoUrl = props.photoUrl;
  }

  goPassword = () => {
    this.setState({loading: true});
    const {
      weight,
      height,
      chronicDisease,
      smoke,
      parentsDisease,
      cholesterol,
      pressure,
    } = this.state;
    setTimeout(() => {
      this.setState({loading: false});
      this.navigationModal(
        this.screen.TotalSimulationScene,
        this.animationType.MODALSLIDERIGHTTOLEFT,
        {
          age: this.age,
          gender: this.gender,
          photoUrl: this.photoUrl,
          weight,
          height,
          chronicDisease,
          smoke,
          parentsDisease,
          cholesterol,
          pressure,
          imc: weight / (height * height),
        },
      );
    }, 2000);
  };

  render() {
    const {
      weight,
      height,
      chronicDisease,
      smoke,
      parentsDisease,
      cholesterol,
      pressure,
      loading,
    } = this.state;

    return super.render(
      !loading ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll={true}>
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
                text={'Informações médicas'}
                marginBottom={verticalScale(17)}
              />
              <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.LINK16}
                text={'Vamos descobrir um pouco mais sobre você :)'}
                color={colors.purple}
              />

              <View
                style={{
                  flex: 3,
                  marginTop: this.isIOS ? verticalScale(40) : verticalScale(5),
                }}>
                <DefaultFormViewComponent
                  value={weight}
                  title={'Qual é seu peso? (em kg)'}
                  autoFocus
                  placeholderText={'00 kg'}
                  onChangeText={(value) => this.setState({weight: value})}
                  keyboardType="numeric"
                  lineBar
                />
                <DefaultFormViewComponent
                  value={height}
                  title={'Qual é sua altura? (em cm)'}
                  placeholderText={'00 cm'}
                  onChangeText={(value) => this.setState({height: value})}
                  keyboardType="numeric"
                  lineBar
                />
                <DefaultFormViewComponent
                  value={chronicDisease}
                  title={'Você tem alguma doença crônica?'}
                  placeholderText={'Sim/Não'}
                  onChangeText={(value) =>
                    this.setState({chronicDisease: value})
                  }
                  lineBar
                />
                <DefaultFormViewComponent
                  value={parentsDisease}
                  title={
                    'Algum parente próximo (pais ou avós) tem ou teve problema cardiáco?'
                  }
                  placeholderText={'Sim/Não'}
                  onChangeText={(value) =>
                    this.setState({parentsDisease: value})
                  }
                  lineBar
                />
                <DefaultFormViewComponent
                  value={cholesterol}
                  title={'Qual seu  nível de colesterol (mg/dL)?'}
                  placeholderText={'00 mg/dL'}
                  onChangeText={(value) => this.setState({cholesterol: value})}
                  keyboardType="numeric"
                  lineBar
                />
                <DefaultFormViewComponent
                  value={pressure}
                  title={
                    'Qual seu nível de pressão arteira sistólica (mmHg/10)?'
                  }
                  placeholderText={'Entre 12 e 14'}
                  onChangeText={(value) => this.setState({pressure: value})}
                  lineBar
                />
                <DefaultFormViewComponent
                  value={smoke}
                  title={'Você fuma?'}
                  placeholderText={'Sim/Não'}
                  onChangeText={(value) => this.setState({smoke: value})}
                  lineBar
                />
                <FadeComponent
                  type={FadeComponent.FadeType.FADEIN}
                  autoPlay
                  style={{marginTop: verticalScale(30)}}>
                  <GenericButtonComponent
                    buttonColor={colors.purple}
                    textColor={colors.white}
                    text={'CALCULAR'}
                    onPress={() => this.goPassword()}
                    loading={loading}
                  />
                </FadeComponent>
              </View>
            </View>
          </FadeComponent>
        </KeyboardAwareScrollView>
      ) : (
        <View style={{flex: 1}}>
          <LottieView
            style={styles.loadingIcon}
            source={require('labsitcode/src/config/lottie/heartbeat.json')}
            autoPlay
            loop
          />
        </View>
      ),
    );
  }
}

const styles = StyleSheet.create({
  loadingIcon: {
    width: Platform.OS === 'ios' ? horizontalScale(500) : horizontalScale(550),
    height: Platform.OS === 'ios' ? verticalScale(500) : verticalScale(550),
    marginTop: verticalScale(6),
    alignSelf: 'center',
  },
});
