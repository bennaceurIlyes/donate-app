import { AppRegistry, I18nManager } from 'react-native';
import { registerRootComponent } from 'expo';

import App from './App';
import { name as appName } from './app.json';

// Force RTL for testing
if (__DEV__) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent(appName, () => App);
