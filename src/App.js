/* eslint-disable import/no-extraneous-dependencies */
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerLoginStack} from 'labsitcode/src/screens';

// Registra as telas no navigation
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  registerLoginStack();
});
