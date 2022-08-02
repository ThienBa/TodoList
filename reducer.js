import storage from "./utils/storage.js";

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null,
}

const actions = {
    // Vì state là reference type nên update ở đây là state thay đổi
    add({ todos }, title) {
        if (title) {
            todos.push({ title, completed: false });
            storage.set(todos);
        }
    },
    toggle({ todos }, index) {
        let todoToggle = todos[index];
        todoToggle.completed = !todoToggle.completed;
        storage.set(todos);
    },
    toggleAll({ todos }, isCompleted) {
        todos.forEach(todo => todo.completed = isCompleted);
        storage.set(todos);
    },
    destroy({ todos }, index) {
        todos.splice(index, 1);
        storage.set(todos);
    },
    switch(state, newFilter) {
        state.filter = newFilter;
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active);
        storage.set(state.todos);
    },
    startEdit(state, index) {
        state.editIndex = index;
    },
    endEdit(state, newTitle) {
        if (state.editIndex !== null) {
            if (newTitle) {
                state.todos[state.editIndex].title = newTitle;
                storage.set(state.todos);
            } else {
                this.destroy(state, state.editIndex);
            }
            state.editIndex = null;
        }
    },
    cancelEdit(state) {
        state.editIndex = null;
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args);
    return state;
}