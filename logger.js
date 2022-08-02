export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action);
        console.group('Previous State', prevState);
        console.group('Action Arguments', args);
        const nextState = reducer(prevState, action, args);
        console.group('Next State', nextState);
        console.groupEnd(action);
        return nextState;
    }
}