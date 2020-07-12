import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {
  TitleInputComponent,
  GenericTextComponent,
} from 'labsitcode/src/components/presentation';
import {verticalScale} from 'labsitcode/src/commons/scaling';
import colors from 'labsitcode/src/commons/colors';
import RedErrorTextComponent from './redErrorTextComponent';

export default class DefaultFormViewComponent extends Component {
  constructor(props) {
    super(props);
    this.fieldRef = React.createRef();
    this.validAnimation = React.createRef();
  }

  focusTextInput = () => this.fieldRef.current.focus();

  isValid = () => {
    return this.fieldRef.current.isValid();
  };

  render() {
    const {
      value,
      title,
      placeholderText,
      type,
      options,
      valid,
      onChangeText,
      maxLength,
      errorMessage,
      customMessage,
      customTriggerErrorMessage,
      autoFocus,
      onSubmitEditing,
      onBlur,
      padded,
      error,
      showAtSign,
      autoCapitalize,
      autoCorrect,
      description,
      lineBar,
      keyboardType,
      secureTextEntry,
      returnKeyType,
    } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            marginBottom: !padded ? verticalScale(10) : verticalScale(18),
          }}>
          <TitleInputComponent
            titleText={title}
            placeholderText={placeholderText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            type={type}
            showAtSign={showAtSign}
            options={options}
            value={value}
            onChangeText={onChangeText}
            ref={this.fieldRef}
            maxLength={maxLength}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            returnKeyType={returnKeyType}
            inputColor={colors.midnightBlack}
          />
          {lineBar && (
            <View
              style={
                valid
                  ? [styles.lineBar, {backgroundColor: colors.green}]
                  : styles.lineBar
              }
            />
          )}
        </View>
        {!valid &&
          (value.length === maxLength ||
            value.length === customTriggerErrorMessage) && (
            <RedErrorTextComponent text={errorMessage} />
          )}
        {!!error && <RedErrorTextComponent text={errorMessage} />}
        {!!valid && value.length === maxLength && !!customMessage && (
          <GenericTextComponent
            text={customMessage}
            color={colors.midnightBlack}
          />
        )}
        {!!description && (
          <GenericTextComponent
            color={colors.black}
            text={description}
            marginTop={verticalScale(20)}
          />
        )}
      </View>
    );
  }
}

DefaultFormViewComponent.propTypes = {
  value: PropTypes.string,
  valid: PropTypes.bool,
  autoFocus: PropTypes.bool,
  showAtSign: PropTypes.bool,
  title: PropTypes.string,
  placeholderText: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  errorMessage: PropTypes.string,
  customTriggerErrorMessage: PropTypes.number,
  description: PropTypes.string,
  error: PropTypes.bool,
  options: PropTypes.string,
  customMessage: PropTypes.string,
  onBlur: PropTypes.string,
  padded: PropTypes.string,
  autoCapitalize: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  lineBar: PropTypes.string,
  secureTextEntry: PropTypes.string,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },

  blockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineBar: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grayLight,
    marginTop: verticalScale(15),
  },
  loadingIcon: {
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
