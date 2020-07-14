import Realm from 'realm';

import ContactSchemas from '../schemas/ContactSchemas';

export default function getRealm() {
  return Realm.open({
    schema: [ContactSchemas],
  }).then((realm) => {
    console.log('oioioii', realm);

    realm.write(() => {
      realm.create('Contact', {
        name: 'Caue',
        email: 'cauehsr@gmail.com',
        star: true,
      });
    });
  });
}
