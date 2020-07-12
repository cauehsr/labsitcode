/* eslint-disable import/no-extraneous-dependencies */
import {Navigation} from 'react-native-navigation';
// import Amplify from 'aws-amplify';
// import Auth from '@aws-amplify/auth';
// import config from 'labsitcode/aws-exports';
import {
  registerScreens,
  registerLoginStack,
  registerHomeStack,
} from 'labsitcode/src/screens';
import {
  storeBearerToken,
  retrieveUserData,
} from 'labsitcode/src/store/tokenLocalStore';
import Store from 'labsitcode/src/store';
import {saveBearerToken, saveUserLoginData} from 'labsitcode/src/actions';
import {AnimationType} from 'labsitcode/src/screens/screenAnimations';

// Amplify.configure({
//   ...config,
//   Analytics: {
//     disabled: true,
//   },
// });

// Registra as telas no navigation
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  retrieveUserData()
    .then((userData) => {
      Store.dispatch(saveUserLoginData(userData));
      setTimeout(() => {
        registerLoginStack(AnimationType.FADEROOT);
      }, 300);
    })
    .catch(() => {
      registerLoginStack();
    });
});
