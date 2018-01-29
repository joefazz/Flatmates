import { state } from '../navigators/Root';

const initialState = {
    login: {
        id: '',
        isRehydrated: false,
        loginStatus: 'Not Started',
        grantedPermissions: [],
        deniedPermissions: [],
        fbAccessToken: '',
        isLoggedIn: false
    },
    profile: {
        name: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        email: '',
        imageUrl: ''
    },
    nav: state
};

export default initialState;

