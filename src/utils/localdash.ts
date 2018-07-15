import { MapboxSDK } from '../App';

function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

async function getCoordsFromAddress(road: string): Promise<string | Array<number>> {
    const address: string = road + ', Reading';
    let res: any;

    try {
        res = await MapboxSDK.geocodeForward(address, {
            country: 'gb',
            proximity: { latitude: 51.4412, longitude: -0.943 }
        });
    } catch (err) {
        alert(
            'There was a problem with the road name you entered, please check it and try again'
        );
        return 'Error';
    }

    if (res.status !== 200 || res.entity.features.length === 0) {
        alert(
            'There was a problem with the road name you entered, please check it and try again.'
        );
        return 'Error';
    } else {
        return res.entity.features[0].center;
    }
}

export { capitalize, getCoordsFromAddress };