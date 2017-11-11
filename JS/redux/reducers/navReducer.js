import Immutable from 'immutable';

import RootNavigator from '../../navigators/Root';
import initialState from '../initialState';

const INITIAL_STATE = Immutable.fromJS(initialState.nav);

export default nav = (state = INITIAL_STATE, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};