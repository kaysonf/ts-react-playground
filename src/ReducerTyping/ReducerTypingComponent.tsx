import React, {FC, useReducer} from "react";
import {reducer} from "./reducer";

type NestedProp = {
    names: string[];
    heights: number[];
}

export type ComplexState = {
    nestedProp: NestedProp;
    groupName: string
}

const INIT_STATE: Readonly<ComplexState> = {
    nestedProp: {
        names: [],
        heights: []
    },
    groupName: 'default name'
}

export const ReducerTypingComponent: FC = () => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    return (
        <>
            <h1>ReducerTypingComponent</h1>
            <h5>names: {state.nestedProp.names}</h5>
            <h5>heights: {state.nestedProp.heights}</h5>

            <button onClick={() => {
                const payload = [...state.nestedProp.names, 'A']
                dispatch({type: 'set_names', payload});
            }}> add names
            </button>

            <button onClick={() => {
                const payload = [...state.nestedProp.heights, 1]
                dispatch({type: 'set_heights', payload});
            }}> add heights
            </button>
        </>
    )
}