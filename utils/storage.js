const STORAGE_TODOS_KEY = 'TODOS_KEY';

export default {
    set(data) {
        localStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(data));
    },
    get() {
        return JSON.parse(localStorage.getItem(STORAGE_TODOS_KEY)) || [];
    }
}