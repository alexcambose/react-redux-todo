export default (store={
    sortBy: 'DATE_CREATED',
    onlyStarred: false,
    onlyCompleted: false,
    todos: []
}, action) => {
    switch(action.type){
        case "ADD_TODO":
            store = {...store, todos: [...store.todos, action.payload]};
            break;
        case "SAVE_TODO": {
            const todos = store.todos.map(e => {
                if (e.id === action.payload.id)
                    e = action.payload;
                return e;
            });
            store = {...store, todos};
            break;
        }
        case "DONE_TODO": {
            const todos = store.todos.map(e => {
                if (e.id === action.payload.id)
                    e.done = action.payload.boolean;
                return e;
            });
            store = {...store, todos};
            break;
        }
        case "FAVOURITE_TODO": {
            const todos = store.todos.map(e => {
                if (e.id === action.payload.id)
                    e.favourite = action.payload.boolean;
                return e;
            });
            store = {...store, todos};
            break;
        }
        case "DELETE_TODO": {
            let todos = store.todos.filter(e => e.id !== action.payload);
            store = {...store, todos};
            break;
        }
        case "SORT_TODO": {
            store = {...store, sortBy: action.payload};
            break;
        }
        case "ONLY_STARRED_TODO":{
            store = {...store, onlyStarred: action.payload};
            break;
        }
        case "ONLY_COMPLETED_TODO":{
            store = {...store, onlyCompleted: action.payload};
            break;
        }
    }


    return store;
}