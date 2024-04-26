import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet,View, TouchableWithoutFeedback, Text, Image, ScrollView ,LogBox,AppRegistry} from 'react-native';

import Navigation from './navigation';
import Login from './Pages/Login';
export default function App() {
  return (
    <View style={styles.container}>
      <Navigation></Navigation>
    </View>
  );
}


AppRegistry.registerComponent('main',() => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
