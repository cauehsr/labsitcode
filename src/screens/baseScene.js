// eslint-disable-next-line no-param-reassign
import React, {Component} from 'react';
import {
  Platform,
  View,
  ScrollView,
  StyleSheet,
  Clipboard,
  Dimensions,
  ImageBackground,
  Image,
  RefreshControl,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from 'labsitcode/src/commons/scaling';
import colors from 'labsitcode/src/commons/colors';
import {
  TopBarComponent,
  GenericTopBarComponent,
} from 'labsitcode/src/components/presentation/topBar';
import {Navigation} from 'react-native-navigation';
import bg03PNG from 'labsitcode/src/assets/img/bg04.png';
import {
  AnimationType,
  GetPopAnimationType,
} from 'labsitcode/src/screens/screenAnimations';
import {Screen, ExampleScreen} from 'labsitcode/src/screens';
import {IS_IPHONE_X} from 'labsitcode/src/commons/utils';
import { GenericModalComponent } from 'labsitcode/src/components/presentation';

const ContainerType = {
  WHITEKEYBOARDAVOIDVIEW: 'WHITEKEYBOARDAVOIDVIEW',
  WHITESCROLLVIEW: 'WHITESCROLLVIEW',
  ORANGEKEYBOARDAVOIDVIEW: 'ORANGEKEYBOARDAVOIDVIEW',
  PROFILEPARALLAXVIEW: 'PROFILEPARALLAXVIEW',
  IMAGESCROLLVIEW: 'IMAGESCROLLVIEW',
};

export default class BaseScene extends Component {
  constructor(props) {
    super(props);

    this.childComponentId = props.childComponentId;
    this.isModalScreen = props.isModalScreen;
    this.containerType = props.containerType;
    this.showBackButton = props.showBackButton || false;
    this.animationTypePop = props.animationTypePop;
    this.listView_Ref = props.listView_Ref;
    this.topBarType = props.topBarType;
    this.navigation = Navigation;
    this.animationType = AnimationType;
    this.screen = Screen;
    this.exampleScreen = ExampleScreen;
    this.removeInnerPadding = props.removeInnerPadding;
    this.removeInnerMargin = props.removeInnerMargin;
    this.rightButtonType = props.rightButtonType;

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

  dismissLoadingModal = timeoutNumber =>
    setTimeout(
      () => this.navigation.dismissModal(this.screen.TransitionLoadingScene),
      timeoutNumber || 500,
    );

  componentDidMount() {
    this.navigation.events().registerBottomTabSelectedListener(this.tabPress);
  }

  tabPress = (info: {selectedTabIndex: number, unselectedTabIndex: number}) => {
    if (info.selectedTabIndex === info.unselectedTabIndex) {
      this.navigationPopToRoot();
    }
  };

  dismissModal = self =>
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

  switchTabBar = index => {
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

  renderInfoModal = props => {
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



  renderScreenContainer(children) {
    const showBackButton = this.showBackButton ? this.navigationPop : null;

    switch (this.containerType) {
      case ContainerType.WHITEKEYBOARDAVOIDVIEW:
        return (
          <View style={styles.whiteKeyboardAvoidView}>
            <TopBarComponent
              topBarType={this.topBarType}
              onBackButtonPress={showBackButton}
              rightButtonType={this.rightButtonType}
            />
            <View
              style={{
                flex: 1,
                marginTop: verticalScale(!this.removeInnerMargin ? 40 : 0),
                paddingLeft: horizontalScale(!this.removeInnerPadding ? 32 : 0),
                paddingRight: horizontalScale(
                  !this.removeInnerPadding ? 32 : 0,
                ),
              }}>
              {children}
            </View>
          </View>
        );
      case ContainerType.WHITESCROLLVIEW:
        return (
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <TopBarComponent
              topBarType={this.topBarType}
              onBackButtonPress={showBackButton}
              rightButtonType={this.rightButtonType}
            />
            <ScrollView
              styles={[
                styles.whiteScrollView,
                {
                  paddingHorizontal: horizontalScale(
                    this.removeInnerPadding ? 0 : 24,
                  ),
                },
              ]}
              refreshControl={
                <RefreshControl
                />
              }>
              <View
                style={{
                  marginTop: verticalScale(this.removeInnerMargin ? 0 : 40),
                }}
              />
              {children}
            </ScrollView>
          </View>
        );
      case ContainerType.IMAGESCROLLVIEW:
        return (
          <ImageBackground
            source={bg03PNG}
            style={{width: '100%', height: '100%'}}>
            <View
              style={{
                height: this.height / 1.15,
              }}
              showsVerticalScrollIndicator={false}>
              <View style={styles.innerViewWrapperView}>{children}</View>
            </View>
          </ImageBackground>
        );
      default:
        return children;
    }
  }

  render(children) {
    return this.isAndroid ||
      this.containerType === ContainerType.IMAGESCROLLVIEW ? (
      this.renderScreenContainer(children)
    ) : (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? verticalScale(50) : 0,
        }}>
        {this.renderScreenContainer(children)}
      </View>
    );
  }
}

BaseScene.ContainerType = ContainerType;
BaseScene.TopBarType = TopBarComponent.TopBarType;
BaseScene.RightButtonType = GenericTopBarComponent.RightButtonType;

BaseScene.propTypes = {
  childComponentId: PropTypes.string,
  isModalScreen: PropTypes.string,
  containerType: PropTypes.oneOf(Object.keys(ContainerType)),
  showBackButton: PropTypes.bool,
  removeInnerPadding: PropTypes.bool,
  removeInnerMargin: PropTypes.bool,
  animationTypePop: PropTypes.string,
  topBarTitleText: PropTypes.string,
  topBarType: PropTypes.oneOf(Object.keys(TopBarComponent.TopBarType)),
  rightButtonType: PropTypes.oneOf(
    Object.keys(GenericTopBarComponent.RightButtonType),
  ),
};

const styles = StyleSheet.create({
  innerViewWrapperView: {
    flex: 1,
    paddingTop: verticalScale(42),
    paddingHorizontal: horizontalScale(24),
  },
  whiteKeyboardAvoidView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  whiteScrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  limitGrid: {
    paddingHorizontal: horizontalScale(24),
  },
  loading: {
    marginTop: verticalScale(5),
    width: 64,
    height: 22,
  },
  logo: {
    width: horizontalScale(150),
    height: verticalScale(50),
    resizeMode: 'contain',
    zIndex: 2,
    marginTop: IS_IPHONE_X ? verticalScale(50) : verticalScale(20),
  },
});
