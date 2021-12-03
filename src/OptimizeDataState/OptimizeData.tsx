import React, {FC, useState} from "react";

type NestedProp = {
    names: string[];
    heights: number[];
}

export type ComplexState = {
    nestedProp: NestedProp;
    groupName: string
}

const Child: FC<ComplexState & { forceRenderParent: () => void; charToAdd: string; heightToAdd: number }> = (props) => {
    const {forceRenderParent, nestedProp, charToAdd, heightToAdd} = props;

    return (
        <>
            <h3>CHILD</h3>
            <h5>names: {nestedProp.names.join('')}</h5>
            <h5>heights {nestedProp.heights.join('')}</h5>

            <button onClick={() => {
                nestedProp.names.push(charToAdd);
                forceRenderParent();
            }}>add {charToAdd} to names
            </button>

            <button onClick={() => {
                nestedProp.heights.push(heightToAdd);
                forceRenderParent();
            }}>add {heightToAdd} to names
            </button>
        </>

    )
}

const dataOutsideComponent: ComplexState = { // EXISTS OUTSIDE COMPONENT
    nestedProp: {
        names: [],
        heights: []
    },
    groupName: 'default name'
}

export const OptimizeData: FC = () => { // this can be a context + provider instead
    const [, setState] = useState({});

    const forceRender = () => {
        setState({});
    }

    // pass in data
    return (
        <>
            <h1>Parent</h1>
            <h2>names: {dataOutsideComponent.nestedProp.names.join('')}</h2>
            <h2>heights: {dataOutsideComponent.nestedProp.heights.join('')}</h2>

            <Child {...dataOutsideComponent} forceRenderParent={forceRender} charToAdd={'a'} heightToAdd={1}/>
            <Child {...dataOutsideComponent} forceRenderParent={forceRender} charToAdd={'b'} heightToAdd={2}/>
        </>
    )
}