import * as actions from "../../ducks/types";
const handlers = {
  [actions.SHOW_LOADER]: state => ({...state, loading: true}),
  [actions.ADD_NOTE]: (state, { payload }) => ({
    ...state,
    notes: [...state.notes, payload]
  }),
  [actions.FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
  [actions.REMOVE_NOTE]: (state, {payload}) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload)
  }),
  DEFAULT: state => state,
};

const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action)
};

export default firebaseReducer