import {ComplexState} from "./ReducerTypingComponent";

type Action =
    | { type: 'set_names', payload: string[] }
    | { type: 'set_heights', payload: number[] }
    | { type: 'nothing' };

export function reducer(state: ComplexState, action: Action): ComplexState {

    switch (action.type) {

        case 'set_names':
            return {
                ...state,
                nestedProp: {
                    ...state.nestedProp,
                    names: action.payload
                }
            }


        case 'set_heights':
            return {
                ...state,
                nestedProp: {
                    ...state.nestedProp,
                    heights: action.payload
                }
            }

        default:
            return state
    }
}