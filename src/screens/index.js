/* eslint-disable global-require */
import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {AnimationType} from './screenAnimations';

export const Screen = {

  // Login
  WelcomeLoginScene: 'login.welcomeLoginScene',
  LoginScene: 'login.loginScene',
  RegisterPasswordScene: 'login.register.registerPasswordScene',
  RegisterConfirmEmailScene: 'login.register.registerConfirmEmailScene',
  RegisterNameScene: 'login.register.registerNameScene',
  RegisterBirthdateScene: 'login.register.registerBirthdateScene',
  ResgiterWelcomeScene: 'login.register.resgiterWelcomeScene',
  ResgiterUserNameScene: 'login.register.resgiterUsernameScene',

  //Simulation
  SelfieScanScene: 'simulation.selfieScanScene',
  CropSelfieScene: 'simulation.cropSelfieScene',
  ImcScene: 'simulation.imcScene',
  TotalSimulationScene: 'simulation.totalSimulationScene',
};

export const registerScreens = () => {
  // Login
  Navigation.registerComponent(
    Screen.WelcomeLoginScene,
    () => require('./login/welcomeLoginScene').default,
  );
  Navigation.registerComponent(
    Screen.LoginScene,
    () => require('./login/loginScene').default,
  );
  Navigation.registerComponent(
    Screen.RegisterPasswordScene,
    () => require('./login/register/registerPasswordScene').default,
  );
  Navigation.registerComponent(
    Screen.RegisterConfirmEmailScene,
    () => require('./login/register/registerConfirmEmailScene').default,
  );
  Navigation.registerComponent(
    Screen.RegisterNameScene,
    () => require('./login/register/registerNameScene').default,
  );
  Navigation.registerComponent(
    Screen.RegisterBirthdateScene,
    () => require('./login/register/registerBirthdateScene').default,
  );
  Navigation.registerComponent(
    Screen.ResgiterWelcomeScene,
    () => require('./login/register/resgiterWelcomeScene').default,
  );
  Navigation.registerComponent(
    Screen.ResgiterUserNameScene,
    () => require('./login/register/resgiterUsernameScene').default,
  );

  //Simulation
  Navigation.registerComponent(
    Screen.SelfieScanScene,
    () => require('./simulation/selfieScanScene').default,
  );
  Navigation.registerComponent(
    Screen.CropSelfieScene,
    () => require('./simulation/cropSelfieScene').default,
  );
  Navigation.registerComponent(
    Screen.ImcScene,
    () => require('./simulation/imcScene').default,
  );
  Navigation.registerComponent(
    Screen.TotalSimulationScene,
    () => require('./simulation/totalSimulationScene').default,
  );
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
              id: Screen.LoginScene,
              name: Screen.LoginScene,
            },
          },
          {
            component: {
              id: Screen.RegisterPasswordScene,
              name: Screen.RegisterPasswordScene,
            },
          },
          {
            component: {
              id: Screen.RegisterNameScene,
              name: Screen.RegisterNameScene,
            },
          },
          {
            component: {
              id: Screen.ResgiterWelcomeScene,
              name: Screen.ResgiterWelcomeScene,
            },
          },
          {
            component: {
              id: Screen.ResgiterUserNameScene,
              name: Screen.ResgiterUserNameScene,
            },
          },
          {
            component: {
              id: Screen.CropSelfieScene,
              name: Screen.CropSelfieScene,
            },
          },
          {
            component: {
              id: Screen.WelcomeLoginScene,
              name: Screen.WelcomeLoginScene,
            },
          },
        ],
      },
    },
  });
};
