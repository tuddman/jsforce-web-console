import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const histories = handleActions({
  INPUT_COMMAND: (histories, action) => {
    const history = { type: 'input', data: action.payload };
    return [ ...histories, history ];
  },
  OUTPUT_RESULT: (histories, action) => {
    const history = { type: 'output', data: action.payload };
    return [ ...histories, history ];
  },
  OUTPUT_INFO: (histories, action) => {
    const history = { type: 'log', level: 'info', message: action.payload };
    return [ ...histories, history ];
  },
  OUTPUT_ERROR: (histories, { payload: err }) => {
    const history = { type: 'log', level: 'error', message: err.message, stack: err.stack };
    return [ ...histories, history ];
  },
}, []);

const loading = handleActions({
  LOADING_START: (loading) => {
    return true;
  },
  LOADING_END: (loading) => {
    return false;
  },
}, false);

const candidates = handleActions({
  INPUT_COMMAND: () => {
    return [];
  },
  COMPLETE: (completions, { payload }) => {
    return payload.candidates;
  },
}, []);

const prompt = handleActions({
  SET_PROMPT: (prompt, action) => {
    return action.payload;
  },
  COMPLETE: (prompt, { payload }) => {
    return payload.text;
  }
}, '');

const rootReducer = combineReducers({
  histories,
  loading,
  prompt,
  candidates,
});

export default rootReducer;
