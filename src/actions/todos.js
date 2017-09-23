export const addTodo = todo => {
    return {
        type: "ADD_TODO",
        payload: todo,
    };
};
export const saveTodo = todo => {
    return {
        type: "SAVE_TODO",
        payload: todo,
    };
};
export const favouriteTodo = (id, boolean) => {
    return{
        type: "FAVOURITE_TODO",
        payload: {id, boolean},
    }
};
export const sortTodo = type => {
    return{
        type: "SORT_TODO",
        payload: type,
    }
};
export const onlyStarredTodo = boolean => {
    return{
        type: "ONLY_STARRED_TODO",
        payload: boolean,
    }
};
export const onlyCompletedTodo = boolean => {
    return{
        type: "ONLY_COMPLETED_TODO",
        payload: boolean,
    }
};
export const doneTodo = (id, boolean) => {
      return {
          type: "DONE_TODO",
          payload: {id, boolean}
      }
};
export const deleteTodo = id => {
    return {
        type: "DELETE_TODO",
        payload: id,
    };
};