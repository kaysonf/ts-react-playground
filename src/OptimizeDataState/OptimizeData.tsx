import React, {Dispatch, FC, useReducer} from "react";

type NestedProp = {
    names: string[];
}

export type ComplexState = {
    nestedProp: NestedProp;
    groupName: string
}


function gen100_000<T>(data: T) {
    return [...Array(100_000)].map(_ => data);
}

const Child: FC<ComplexState & { dispatch: Dispatch<Action>; charToAdd: string; }> = (props) => {
    const {dispatch, nestedProp, charToAdd,} = props;

    return (
        <>
            <h3>CHILD</h3>
            <h5>names: {nestedProp.names.join('')}</h5>

            <button onClick={() => {
                renTiming = Date.now();
                dispatch({type: 'optimizedChar', char: gen100_000(charToAdd)});
            }}>add {charToAdd} to names
            </button>

            <button onClick={() => {
                renTiming = Date.now();
                dispatch({type: 'spreadChar', char: gen100_000(charToAdd)});
            }}>add {charToAdd} to names with SPREAD
            </button>
        </>

    )
}

const dataOutsideComponent: ComplexState = { // EXISTS OUTSIDE COMPONENT
    nestedProp: {
        names: [],
    },
    groupName: 'default name'
}

type Action =
    | { type: 'optimizedChar', char: string[] }
    | { type: 'spreadChar', char: string[] }

const optimizedDataReducer = (curr: () => ComplexState, action: Action): () => ComplexState => {
    switch (action.type) {
        case 'optimizedChar': {
            dataOutsideComponent.nestedProp.names.push(...action.char);
            renTiming = Date.now() - renTiming;
            return () => dataOutsideComponent;
        }

        case "spreadChar": {
            dataOutsideComponent.nestedProp.names.push(...action.char);

            const clone = {
                ...dataOutsideComponent,
                nestedProp: {
                    names: [...dataOutsideComponent.nestedProp.names],
                }
            }
            renTiming = Date.now() - renTiming;
            return () => clone;
        }

    }

}

const getData = () => dataOutsideComponent;

let renTiming: number;

export const OptimizeData: FC = () => { // this can be a context + provider instead
    const [_data, dispatch] = useReducer(optimizedDataReducer, getData);

    const data = _data();

    console.log('renderTiming', renTiming);

    // pass in data
    return (
        <>
            <h1>Parent</h1>
            <h2>names: {data.nestedProp.names.join('')}</h2>

            <Child {...data} dispatch={dispatch} charToAdd={'a'} />
        </>
    )
}