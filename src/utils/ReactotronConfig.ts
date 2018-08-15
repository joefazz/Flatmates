import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

var Tron: any = 0;

// if (__DEV__) {
//     Tron = Reactotron.configure()
//         .useReactNative()
//         .use(reactotronRedux())
//         .use(sagaPlugin())
//         .connect();
// }

export default Tron;
