import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../../commons/colors';
import {verticalScale, fontScale, horizontalScale} from '../../commons/scaling';
import {GenericTextComponent} from 'labsitcode/src/components/presentation';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { GenericTextComponent } from 'labsitcode/src/components/presentation/genericTextComponent';

export const TopbarComponent = ({topbarType, topbarProps, close}) => {
  switch (topbarType) {
    case TopbarType.TOPBARDEFAULT:
      return (
        <View style={[styles.container]}>
          {topbarProps.close ? (
            <TouchableOpacity onPress={topbarProps.onPressBack}>
              <Icon
                name="chevron-left"
                size={fontScale(25)}
                color={colors.white}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.HEADINGXL}
              marginTop={verticalScale(40)}
              text={'CONTATOS'}
              color={colors.white}
            />
          )}
        </View>
      );
    default:
      return <View style={[styles.container]} />;
  }
};

const TopbarType = {
  TOPBARDEFAULT: 'TOPBARDEFAULT',
};

TopbarComponent.TopbarType = TopbarType;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(120),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: verticalScale(20),
  },
});
