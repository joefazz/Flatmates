import { state } from '../navigators/Root';

const initialState = {
    login: {
        isRehydrated: false,
        fbToken: 0,
        fbTokenExpires: 0,
        loginStatus: 'Not Started'
    },
    nav: state
};

export default initialState;

