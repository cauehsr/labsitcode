/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import colors from 'labsitcode/src/commons/colors';
import { View, StyleSheet, TextInput } from 'react-native';
import { fontScale } from 'labsitcode/src/commons/scaling';

export const TextInputComponent = React.forwardRef((props) => {
  return (
    <View style={styles.textAreaContainer}>
      <TextInput
        style={[styles.textArea, { fontSize: fontScale(props.fontSize) }]}
        {...props}
        placeholder={props.placeholderText}
        numberOfLines={10}
        placeholderTextColor={colors.gray01}
        textAlign={props.textAlign}
        multiline={props.multiline}
        height={props.height}
        borderRadius={props.borderRadius}
        borderWidth={props.borderWidth}
        fontFamily={props.fontFamily}
        value={props.value}
        onChangeText={props.onChangeText}
        borderColor={props.borderColor}
        marginRight={props.marginRight}
        marginLeft={props.marginLeft}
        marginTop={props.marginTop}
        marginBottom={props.marginBottom}
      />
    </View>
  );
});

TextInputComponent.defaultProps = {
  placeholderText: '',
  textAlign: 'left',
  height: 'auto',
  fontSize: 28,
  fontFamily: 'Lato-Regular',
  borderRadius: 0,
  borderWidth: 0,
  borderColor: '',
  marginRight: 0,
  marginLeft: 0,
  marginTop: 0,
  marginBottom: 0
};

TextInputComponent.propTypes = {
  placeholderText: PropTypes.string,
  textAlign: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.number,
  multiline: PropTypes.bool,
  borderRadius: PropTypes.string,
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  value: PropTypes.string,
  marginRight: PropTypes.number,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number
};

const styles = StyleSheet.create({
  textAreaContainer: {
    padding: 5
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
    padding: 0,
    color: colors.midnightBlack,
    backgroundColor: 'white'
  }
});
