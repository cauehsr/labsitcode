export const ContactSchema = {
  name: 'Contacts',
  primaryKey: 'IdNameOfContacts',
  properties: {
    IdNameOfContacts: 'int',
    NameContact: 'string?',
    Email: 'string?',
    Star: 'bool?',
  },
};
