import { Platform } from "react-native";

export const FONT_FAMILY = Platform.OS === 'ios' ? 'Nunito' : 'Nunito Regular';

const font = {
    Nunito: {
        weights: {
            Bold: 'bold',
            SemiBold: '600',
            Regular: '400',
            Light: '300'
        },
        styles: {
            Italic: 'italic'
        }
    }
};

export const FontFactory = (options = {}) => {
    let { weight, style, family } = Object.assign({
        weight: null,
        style: null,
        family: 'Nunito'
    }, options);

    const { weights, styles } = font[family];

    if (Platform.OS === 'android') {
        weight = weights[weight] ? weight : 'Regular';
        style = styles[style] ? style : ''

        const suffix = weight + style;

        return {
            fontFamily: family + (suffix.length ? ` ${suffix}` : '')
        }
    } else {
        weight = weights[weight] || weights.Regular;
        style = styles[style] || 'normal';

        return {
            fontFamily: family,
            fontWeight: weight,
            fontStyle: style
        }
    }
}