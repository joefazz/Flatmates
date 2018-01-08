import { Metrics } from '../consts';

const TYPES = {
    Width: 'width',
    Height: 'height',
    Font: 'fontSize'
};

export function toConstantWidth(percentage) {
    return toConstant(percentage, TYPES.Width);
}

export function toConstantHeight(percentage) {
    return toConstant(percentage, TYPES.Height);
}

export function toConstantFontSize(percentage) {
    return toConstant(percentage, TYPES.Font);
}

function toConstant(percentage, type) {
    switch(type) {
        case TYPES.Width:
            return Metrics.screenWidth * (percentage / 100);
        case TYPES.Height:
            return Metrics.screenHeight * (percentage / 100);
        case TYPES.Font:
            return Metrics.totalSize * (percentage / 100);
    }
}