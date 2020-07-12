/* eslint-disable */
export const formatMoney = val =>
  val
    ? val
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
    : '0,00';

export const formatThousands = nStr => {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }

  return x1 + x2;
};




export const validateName = fieldValue => {
  if (fieldValue.trim().length > 3) {
    return true;
  }
  return false;
};

export const validateTrim = fieldValue => {
  if (fieldValue.trim().length > 0) {
    return false;
  }
  return true;
};

export const formatBirthdate = birthdate => {
  const day = birthdate.substring(8, 10);
  const month = birthdate.substring(5, 7);
  const year = birthdate.substring(0, 4);
  return `${day}/${month}/${year}`;
};

export const validate = fieldValue => {
  if (fieldValue.trim().length > 1) {
    return false;
  }
  return true;
};


export const validateBirthdate = birthdate =>
  /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/g.test(
    birthdate.replace(/ /g, '/')
  );

export const validateCellphone = cellphone =>
  /^(?:[11-99][1-9]9[2-9]|[3-9][1-9][5-9])[0-9]{7}$/g.test(
    cellphone.replace(/[^\d]+/g, '')
  );

export const validateEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

