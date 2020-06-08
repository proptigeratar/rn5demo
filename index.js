/**
 * @format
 */
// import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import Main from './Main';
import List from './List';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
