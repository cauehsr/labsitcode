/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  GenericButtonComponent,
  GenericTextComponent,
  TextLinkButtonComponent
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import BaseScene from 'labsitcode/src/screens/baseScene';
import FadeComponent from 'labsitcode/src/components/container/animations/fadeComponent';
import DefaultFormViewComponent from 'labsitcode/src/components/container/defaultFormViewComponent';
import { verticalScale, fontScale } from 'labsitcode/src/commons/scaling';
// import ImagePicker from 'react-native-image-crop-picker';
// import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
// import { createUser } from 'labsitcode/src/graphql/mutations';
import { storeUserData } from 'labsitcode/src/store/tokenLocalStore';
import Store from 'labsitcode/src/store';
import { validateTrim } from 'labsitcode/src/commons/utils';
import { saveUserLoginData } from 'labsitcode/src/actions';

// import awsmobile from '../../../../aws-exports';

// const {
//   aws_user_files_s3_bucket_region: region,
//   aws_user_files_s3_bucket: bucket
// } = awsmobile;

export default class ResgiterUserNameScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.WHITEKEYBOARDAVOIDVIEW,
      isModalScreen: true,
      showBackButton: true,
      ...props
    });

    const { userReducer } = Store.getState();
    this.state = {
      email: userReducer ? userReducer.email : '',
      id: userReducer ? userReducer.id : '',
      name: userReducer ? userReducer.name : '',
      gender: userReducer ? userReducer.gender : '',
      birthdate: userReducer ? userReducer.birthdate : '',
      image: '',
      username: '',
      erro: false,
      valid: false,
      loading: false,
      showButton: false,
      disabled: true
    };

    this.navigationPop = () => this.dismissModal(true);
  }

  // componentDidMount() {
  //   Auth.currentAuthenticatedUser()
  //     .then(user => {
  //       console.log('entrou');
  //       console.log(user);
  //       this.setState({
  //         email: user.attributes.email,
  //         id: user.username
  //       });
  //     })
  //     .catch(() => console.log('Not signed in'));
  // }

  // createNewUser = async () => {
  //   this.setState({ loading: true });
  //   const { name, gender, birthdate, username, image, id } = this.state;
  //   const key = `image/${id}`;
  //   const fileForUpload = {
  //     bucket,
  //     key,
  //     region
  //   };

  //   const user = {
  //     id,
  //     username: username.trim(),
  //     name: name || null,
  //     gender: gender || null,
  //     birthdate: birthdate || null,
  //     avatar: fileForUpload
  //   };

  //   const response = await fetch(
  //     image
  //       ? image.path
  //       : 'https://labsitcodec0e60c2ec7854f9f99590e6b88288bbb-labsitcodeapp.s3.amazonaws.com/public/image/profile.jpeg'
  //   );
  //   const blob = await response.blob();

  //   API.graphql(graphqlOperation(createUser, { input: user }))
  //     .then(responseUser => {
  //       Storage.put(key, blob, {
  //         contentType: 'image/jpeg'
  //       })
  //         .then(() => {
  //           this.saveStore(responseUser);
  //         })
  //         .catch(error => {
  //           console.log(error);

  //           this.setState({ loading: false });
  //         });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.setState({ loading: false });
  //     });
  // };



  // addImage = () => {
  //   ImagePicker.openPicker({
  //     width: 400,
  //     height: 400,
  //     cropping: true,
  //     cropperCircleOverlay: true
  //   }).then(data => {
  //     this.setState({ image: data });
  //   });
  // };

  render() {
    const { username, showButton, image, loading, erro } = this.state;

    return super.render(
      <FadeComponent
        type={FadeComponent.FadeType.FADEIN}
        autoPlay
        style={{ flex: 1 }}
      >
        <View style={{ flex: 2 }}>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.HEADINGL}
            color={colors.black}
            text={'ajustProfile'}
            marginBottom={verticalScale(13)}
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
            text={'addPhoto'}
            color={colors.gray}
          />
          <View style={{ flex: 2 }}>
            <DefaultFormViewComponent
              value={username.trim()}
              placeholderText="username"
              onChangeText={value => this.setState({ username: value })}
              autoCapitalize="none"
              error={erro}
              errorMessage={'required'}
              autoCorrect={false}
              onBlur={() =>
                this.setState({
                  showButton: true,
                  erro: validateTrim(username)
                })
              }
              autoFocus
              lineBar
            />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
              text={'createUsername'}
              color={colors.gray01}
              marginBottom={verticalScale(70)}
            />
          </View>
          {!!showButton && (
            <View
              style={{
                flex: 3,
                alignItems: 'center'
              }}
            >
              {!image ? (
                <Image
                  style={styles.boxIcon}
                  source={require('labsitcode/src/assets/img/profile.jpeg')}
                />
              ) : (
                  <Image style={styles.boxIcon} source={{ uri: image.path }} />
                )}
              <TextLinkButtonComponent
                styleguideItem={GenericTextComponent.StyleguideItem.LINK}
                text={'addImage'}
                onPress={() => this.addImage()}
                color={colors.purple}
              />
            </View>
          )}

          {!!showButton && !erro && (
            <View style={{ flex: 1 }}>
              <View style={styles.buttons}>
                <GenericButtonComponent
                  buttonColor={colors.purple}
                  textColor={colors.white}
                  loading={loading}
                  text={'conclude'}
                  onPress={() => this.createNewUser()}
                />
              </View>
            </View>
          )}
        </View>
      </FadeComponent>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  boxIcon: {
    width: 64,
    height: 64,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.grayLight01,
    marginBottom: verticalScale(15)
  }
});
