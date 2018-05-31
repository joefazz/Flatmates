import { AppRegistry } from 'react-native';
import App from './src/App';
import { Sentry } from 'react-native-sentry';

Sentry.config(
    'https://ff264cadb5f4403d8b6dbfd86e610646:41e9999cbe0745ab9fc6d069d656fee0@sentry.io/1216809'
).install();
AppRegistry.registerComponent('Flatmates', () => App);
