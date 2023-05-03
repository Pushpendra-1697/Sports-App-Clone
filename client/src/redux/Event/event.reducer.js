import { ADD_EVENT, EVENT_ERROR, EVENT_LOADING, EVENT_SUCCESS } from "./event.type";

const initialState = {
    events: [],
    error: false,
    loading: false
};
export const eventReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_EVENT: {
            return {
                ...state,
                loading: false,
                events: [...state.events, payload]
            }
        }
        case EVENT_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case EVENT_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload || true
            }
        }
        case EVENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                events: payload
            }
        }
        default: {
            return state;
        }
    }
}