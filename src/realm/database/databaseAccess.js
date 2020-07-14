import Realm from 'realm';
import {ContactSchema} from './model';

const getContacts = async () => {
  const realm = new Realm({schema: [ContactSchema]});
  return await realm.objects('Contacts');
};

const saveContact = async (contact) => {
  const realm = new Realm({schema: [ContactSchema]});
  await realm.write(() => {
    realm.create('Contacts', contact);
  });
  realm.close();
};

const updateContact = async (contact) => {
  const realm = await new Realm({schema: [ContactSchema]});
  await realm.write(() => {
    realm.create('Contacts', contact, true);
  });
};

const mock = async () => {
  const realm = new Realm({schema: [ContactSchema]});
  await realm.write(() => {
    realm.deleteAll();
  });
  realm.close();
  contacts.map((contact) => {
    saveContact(contact);
  });
};

const contacts = [
  {
    IdNameOfContacts: 600001,
    NameContact: 'Caue Henrique',
    Email: 'cauehsr@gmail.com',
    Star: false,
  },
  {
    IdNameOfContacts: 600002,
    NameContact: 'Andrews',
    Email: 'andrews@labsit.io',
    Star: false,
  },
  {
    IdNameOfContacts: 600003,
    NameContact: 'Henrique',
    Email: 'henrique@gmail.com',
    Star: false,
  },
  {
    IdNameOfContacts: 600004,
    NameContact: 'Jorge',
    Email: 'Jorge@gmail.com',
    Star: false,
  },
  {
    IdNameOfContacts: 600005,
    NameContact: 'Fabio',
    Email: 'fabio@gmail.com',
    Star: false,
  },
  {
    IdNameOfContacts: 600006,
    NameContact: 'João',
    Email: 'joao@gmail.com',
    Star: false,
  },
  {
    IdNameOfContacts: 600007,
    NameContact: 'Lucas',
    Email: '',
    Star: false,
  },
  {
    IdNameOfContacts: 600008,
    NameContact: 'Gabriela',
    Email: '',
    Star: false,
  },
  {
    IdNameOfContacts: 600009,
    NameContact: 'Julia',
    Email: 'julia@gmail.com',
    Star: false,
  },
  {
    IdNameOfContacts: 600010,
    NameContact: 'Paulo',
    Email: 'paulo@gmail.com',
    Star: false,
  },
  {
    IdNameOfContacts: 600011,
    NameContact: 'Mario',
    Email: '',
    Star: false,
  },
];

export {getContacts, saveContact, mock, updateContact};
