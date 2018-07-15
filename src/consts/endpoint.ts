import { Platform } from 'react-native';

// export const DOMAIN = 'https://flatmates-prisma.now.sh';
export const DOMAIN =
    Platform.OS === 'android' ? 'http://192.168.0.10:4000' : 'http://localhost:4000';
