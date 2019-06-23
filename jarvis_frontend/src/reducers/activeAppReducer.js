import { CHANGE_APP } from '../actions/activeAppActions';

export default function(state={}, {type, payload}) {
    switch(type) {
        case 'CHANGE_APP':
            return payload;
        default:
            return state;
    }
}