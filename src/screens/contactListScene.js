import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import BaseScene from 'labsitcode/src/screens/baseScene';
import {
  GenericTextComponent,
  ContactListComponent,
} from 'labsitcode/src/components/presentation';
import colors from 'labsitcode/src/commons/colors';
import {verticalScale} from 'labsitcode/src/commons/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  mock,
  getContacts,
  updateContact,
} from 'labsitcode/src/realm/database/databaseAccess';

export default class ContactListScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.TOPBARBLUE,
      topbarProps: {
        close: false,
      },
      ...props,
    });

    this.state = {
      listContact: [],
      index: null,
      currentItem: null,
      showModal: false,
    };

    this.navigationClose = () => {};
  }

  componentDidMount() {
    this.getContact();
  }

  getContact = async () => {
    // Descomente a linha para criar a lista novamente
    // await mock();
    const results = await getContacts();
    const array = [];
    results.map((item) => {
      array.push(JSON.parse(JSON.stringify(item)));
    });

    this.setState({
      listContact: array.sort((a, b) =>
        a.Star === b.Star ? 0 : a.Star ? -1 : 1,
      ),
    });
  };

  favoriteContact = async (index) => {
    this.setState({showModal: false});
    this.setState((prevState) => {
      const listContact = [...prevState.listContact];

      if (listContact[index].Star) {
        listContact[index].Star = false;
        updateContact(listContact[index]);
      } else {
        listContact[index].Star = true;
        updateContact(listContact[index]);
      }
      return {
        listContact: listContact.sort((a, b) =>
          a.Star === b.Star ? 0 : a.Star ? -1 : 1,
        ),
      };
    });
  };

  onPressModal = (index, item) => {
    this.setState({showModal: true, currentIndex: index, currentItem: item});
  };

  onPressContact = () => {
    const {currentItem} = this.state;
    this.setState({showModal: false});
    setTimeout(() => {
      if (currentItem.Email) {
        this.navigationModal(
          this.screen.ContactFormScene,
          this.animationType.MODALSLIDERIGHTTOLEFT,
          {user: currentItem},
        );
      } else {
        Alert.alert('Infelizmente o contato não tem um email :(');
      }
    }, 600);
  };

  render() {
    const {showModal, listContact, currentIndex} = this.state;
    return super.render(
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}
        style={styles.container}>
        <View>
          <FlatList
            style={styles.contact}
            numColumns={1}
            data={listContact}
            extraData={listContact}
            renderItem={({item, index}) => (
              <ContactListComponent
                text={item.NameContact}
                star={item.Star}
                onPress={() => this.onPressModal(index, item)}
                onPressFavorite={() => this.favoriteContact(index)}
              />
            )}
          />
        </View>

        {this.renderInfoModal({
          isVisible: showModal,
          onClose: () => this.setState({showModal: false}),
          distanceFromTop: Platform.OS === 'ios' ? this.height * 0.03 : 0,
          colorModal: colors.black,
          children: (
            <View style={styles.containerModal}>
              <TouchableOpacity
                onPress={() => this.favoriteContact(currentIndex)}>
                <GenericTextComponent
                  styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
                  text={'Favoritar Contato'}
                  color={colors.white}
                  textAlign={'center'}
                  marginBottom={verticalScale(20)}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressContact()}>
                <GenericTextComponent
                  styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
                  text={'Enviar Email'}
                  color={colors.white}
                  textAlign={'center'}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
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
  },
  contact: {
    marginBottom: verticalScale(150),
  },
});
