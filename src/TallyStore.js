import Dispatcher from './Dispatcher';
import EventEmitter from 'EventEmitter';
//let tally = 0;
var tally = {
    count:0
};
const increment = () => {
    tally.count  += 1;
};
const decrement = () => {
    tally.count -= 1;
};
const zero = () => {
    tally.count = 0
};
class TallyStore extends EventEmitter {
    getTally () {
        return Object.assign({}, tally);
    }
    addChangeListener(callback) {
        this.addListener('CHANGE', callback);
    }
    removeChangeListener(callback) {
        this.removeChangeListener('CHANGE', callback);
    }
    emitChange () {
        this.emit ('CHANGE')
    }
}
const instance = new TallyStore();
export default instance;

const handleAction = (action) => {
    switch (action.type) {
        case 'INCREMENT':
            increment();
            break;
        case 'DECREMENT':
            decrement();
            break;
        case 'ZERO':
            zero();
            break;
        default:
        // do nothing
    }
    instance.emitChange();
};
Dispatcher.register(handleAction);