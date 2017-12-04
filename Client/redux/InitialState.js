import { state } from '../navigators/Root';

const initialState = {
    login: {
        isRehydrated: false,
        loginStatus: 'Not Started',
        grantedPermissions: [],
        deniedPermissions: [],
        fbAccessToken: ''
    },
    nav: state
};

export default initialState;

