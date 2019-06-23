const CHANGE_APP = 'CHANGE_APP';

export function openWeather() {
    return {
        type: 'CHANGE_APP',
        payload: 'weather'
    }
}