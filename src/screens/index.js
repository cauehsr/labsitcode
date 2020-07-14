/* eslint-disable global-require */
import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {AnimationType} from './screenAnimations';

export const Screen = {

  // Login
  ContactListScene: 'contactListScene',
  ContactFormScene: 'contactFormScene',
  // LoginScene: 'login.loginScene',
};

export const registerScreens = () => {
  // Login
  Navigation.registerComponent(
    Screen.ContactListScene,
    () => require('./contactListScene').default,
  );
  Navigation.registerComponent(
    Screen.ContactFormScene,
    () => require('./contactFormScene').default,
  );
  // Navigation.registerComponent(
  //   Screen.LoginScene,
  //   () => require('./login/loginScene').default,
  // );
};

export const registerLoginStack = () => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
    modalPresentationStyle: 'overFullScreen',
    animations: {
      setRoot: AnimationType.FADEROOT,
      push: {
        waitForRender: Platform.OS === 'ios',
      },
      pop: {
        waitForRender: Platform.OS === 'ios',
      },
      showModal: {
        waitForRender: Platform.OS === 'ios',
      },
      dismissModal: {
        waitForRender: Platform.OS === 'ios',
      },
    },
    layout: {
      orientation: ['portrait'],
    },
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: Screen.ContactFormScene,
              name: Screen.ContactFormScene,
            },
          },
          {
            component: {
              id: Screen.ContactListScene,
              name: Screen.ContactListScene,
            },
          },
        ],
      },
    },
  });
};
