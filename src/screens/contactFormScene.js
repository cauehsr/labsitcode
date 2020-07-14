import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import BaseScene from 'labsitcode/src/screens/baseScene';
import {
  GenericTextComponent,
  GenericButtonComponent,
  DefaultContactComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import {verticalScale} from 'labsitcode/src/commons/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DefaultFormViewComponent from 'labsitcode/src/components/container/defaultFormViewComponent';
import {getContacts, mock} from 'labsitcode/src/realm/database/databaseAccess';
import PostService from 'labsitcode/src/services/postService';

export default class ContactFormScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.TOPBARBLUE,
      topbarProps: {
        close: true,
        onPressBack: () => this.dismissModal(),
      },
      ...props,
    });

    this.state = {
      title: '',
      description: '',
      realm: null,
      loading: false,
    };

    this.postService = new PostService();
    this.user = props.user;
  }

  sendEmail = () => {
    const {title, description} = this.state;
    this.setState({loading: true});
    const payload = {
      templateName: 'labsitcodeTeste3',
      sendTo: this.user.Email,
      data: {
        short_name: 'Caue',
        title,
        description,
      },
    };

    this.postService
      .sendEmail(payload)
      .then(() => {
        this.setState({loading: false, title: '', description: ''});
        Alert.alert('email enviado');
      })
      .catch((error) => {
        this.setState({loading: false, title: '', description: ''});
        Alert.alert(error);
      });
  };

  render() {
    const {title, description, loading} = this.state;

    return super.render(
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}>
        <View style={styles.container}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
            text={'NOVA MENSAGEM'}
            color={colors.white}
            textAlign={'center'}
            marginBottom={verticalScale(30)}
          />
          <DefaultFormViewComponent
            value={title}
            titleText={'Titulo'}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(value) => this.setState({title: value})}
            lineBar
            returnKeyType="next"
          />

          <DefaultFormViewComponent
            value={description}
            titleText={'Descrição'}
            autoCorrect={false}
            autoCapitalize="none"
            numberOfLines={10}
            multiline={true}
            height={200}
            onChangeText={(value) => this.setState({description: value})}
            lineBar
          />
          <View style={styles.buttons}>
            <GenericButtonComponent
              buttonColor={colors.inkBlue}
              textColor={colors.white}
              text={'ENVIAR'}
              loading={loading}
              onPress={() => this.sendEmail()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>,
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : 0,
    position: 'relative',
    backgroundColor: colors.black,
    padding: verticalScale(20),
  },
  buttons: {
    position: 'absolute',
    width: '100%',
    bottom: Platform.OS === 'ios' ? verticalScale(170) : verticalScale(200),
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
