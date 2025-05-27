import React from 'react';
import { StyleSheet, View } from 'react-native';

import ScrollViewExample from './components/ScrollViewExamples';

export default function App() {
 
  return (
    <View style={styles.container}>
      <ScrollViewExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 600,
    marginTop: 150,
  }
});
