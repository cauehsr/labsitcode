// eslint-disable-next-line no-param-reassign
import React, {Component} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Clipboard,
  Dimensions,
  BackHandler,
} from 'react-native';
import colors from 'labsitcode/src/commons/colors';
import {Navigation} from 'react-native-navigation';
import {
  AnimationType,
  GetPopAnimationType,
} from 'labsitcode/src/screens/screenAnimations';
import {Screen} from 'labsitcode/src/screens';
import {
  GenericModalComponent,
  TopbarComponent,
} from 'labsitcode/src/components/presentation';

export default class BaseScene extends Component {
  constructor(props) {
    super(props);

    this.childComponentId = props.childComponentId;
    this.isModalScreen = props.isModalScreen;
    this.containerType = props.containerType;
    this.animationTypePop = props.animationTypePop;
    this.topBarType = props.topBarType;
    this.navigation = Navigation;
    this.animationType = AnimationType;
    this.screen = Screen;

    this.topbarProps = props.topbarProps;

    this.height = Dimensions.get('window').height;
    this.width = Dimensions.get('window').width;
    this.isIOS = Platform.OS === 'ios';
    this.isAndroid = Platform.OS === 'android';
    this.fieldRef = React.createRef();

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.navigationClose();
      return true;
    });
  }

  navigationClose = () =>
    this.isModalScreen ? this.dismissModal(true) : this.navigationPop();

  dismissLoadingModal = (timeoutNumber) =>
    setTimeout(
      () => this.navigation.dismissModal(this.screen.TransitionLoadingScene),
      timeoutNumber || 500,
    );

  dismissModal = (self) =>
    !self
      ? this.navigation.dismissAllModals()
      : setTimeout(
          () => this.navigation.dismissModal(this.childComponentId),
          500,
        );

  onFilterTopBarPress = () => {};

  onCopy = async (value, callback) => {
    await Clipboard.setString(value);
    callback();
  };

  componentWillUnmount = () => {
    this.backHandler && this.backHandler.remove();
  };

  navigateTo(screenTo, animationType, passProps, repeat) {
    if (!passProps) {
      passProps = {};
    }
    passProps.animationTypePop = GetPopAnimationType(animationType);
    this.navigation.push(this.childComponentId, {
      component: {
        id: `${screenTo}${repeat ? Math.floor(Math.random() * 100) + 1 : ''}`,
        name: screenTo,
        passProps,
        options: {
          animations: {
            push: animationType,
          },
          bottomTabs: {
            visible: true,
          },
        },
      },
    });
  }

  navigationPop() {
    Navigation.pop(this.childComponentId);
  }

  navigationPopToRoot() {
    this.navigation.popToRoot(this.childComponentId, {
      animations: {
        pop: this.animationType.SLIDELEFTTORIGHT,
      },
    });
  }

  switchTabBar = (index) => {
    Navigation.mergeOptions(this.componentId, {
      bottomTabs: {
        currentTabIndex: index,
      },
    });
  };

  navigationModal(screenTo, animationType, passProps, repeat) {
    this.navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: `${screenTo}${
                repeat ? Math.floor(Math.random() * 100) + 1 : ''
              }`,
              name: screenTo,
              passProps,
              options: {
                animations: {
                  showModal: animationType,
                  dismissModal: GetPopAnimationType(animationType),
                },
                bottomTabs: {
                  visible: true,
                },
                layout: {
                  orientation: ['portrait'],
                },
              },
            },
          },
        ],
      },
    });
  }

  renderInfoModal = (props) => {
    return (
      <GenericModalComponent
        isVisible={props.isVisible}
        onClose={props.onClose}
        distanceFromTop={props.distanceFromTop}
        colorModal={props.colorModal}>
        {props.children}
      </GenericModalComponent>
    );
  };

  render(children) {
    switch (this.containerType) {
      case ContainerType.TOPBARBLUE:
        return (
          <View style={{backgroundColor: colors.inkBlue}}>
            <TopbarComponent
              topbarType={TopbarComponent.TopbarType.TOPBARDEFAULT}
              topbarProps={this.topbarProps}
            />
            {children}
          </View>
        );
    }
  }
}

const ContainerType = {
  TOPBARBLUE: 'TOPBARBLUE',
};

BaseScene.ContainerType = ContainerType;

