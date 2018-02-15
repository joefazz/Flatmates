import { Metrics } from '../consts';

enum TYPES {
    Width = 'width',
    Height = 'height',
    Font = 'fontSize'
};

export function toConstantWidth(percentage: number): number {
    return toConstant(percentage, TYPES.Width);
}

export function toConstantHeight(percentage: number): number {
    return toConstant(percentage, TYPES.Height);
}

export function toConstantFontSize(percentage: number): number {
    return toConstant(percentage, TYPES.Font);
}

export function toPercentageHeight(constant: number): number {
    return toPercentage(constant, TYPES.Height);
}

export function toPercentageWidth(constant: number): number {
    return toPercentage(constant, TYPES.Width);
}

export function toPercentageFontSize(constant: number): number {
    return toPercentage(constant, TYPES.Font);
}

function toPercentage(constant: number, type: TYPES): number {
    switch (type) {
        case TYPES.Width:
            return (constant * 100) / Metrics.screenWidth;

        case TYPES.Height:
            return (constant * 100) / Metrics.screenHeight;

        case TYPES.Font:
            return (constant * 100) / Metrics.totalSize;
    }
}

function toConstant(percentage: number, type: TYPES): number {
    switch (type) {
        case TYPES.Width:
            return Metrics.screenWidth * (percentage / 100);
        case TYPES.Height:
            return Metrics.screenHeight * (percentage / 100);
        case TYPES.Font:
            return Metrics.totalSize * (percentage / 100);
    }

    return 0;
}