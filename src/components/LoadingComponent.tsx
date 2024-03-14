import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingComponent = (): React.JSX.Element => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={'white'} />
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 9,
    flex: 1,
    height: '100%',
  },
});

export default LoadingComponent;
