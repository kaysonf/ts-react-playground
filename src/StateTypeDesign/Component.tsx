import {FC, useState} from "react";

type FarmWithNulls = {
    name: string | null;
    size: number | null;
    animals: { [name: string]: number };
}

type BasicFarm = {
    name: string;
    size: number;
    animals: { [name: string]: number };
}

type FullFarm = BasicFarm | null;

export const StateTypeDesignComp: FC = () => {
    const INIT_STATE_FOR_FARM_WITH_NULLS: FarmWithNulls = {
        name: null,
        size: null,
        animals: {},
    }
    const [state, setState] = useState<FarmWithNulls>(INIT_STATE_FOR_FARM_WITH_NULLS);
    const {name, size, animals} = state;
    return (
        <>
            {name && <h1>{name}</h1>}
            {size && <h2>{size} acres</h2>}
            {Object.keys(animals).map((animal) => <h3>{animal}: {animals[animal]}</h3>)}
            <button onClick={() => setState(curr => ({...curr, name: 'kayson'}))}>set name as kayson</button>
        </>
    )
}

const FullFarmComp: FC = () => {

    const [state, setState] = useState<FullFarm>(null);

    const renderFarm = () => {
        if (state === null)
            return <></>

        else {
            const {name, size, animals} = state;
            return (
                <>
                    {name && <h1>{name}</h1>}
                    {size && <h2>{size} acres</h2>}
                    {Object.keys(animals).map((animal) => <h3>{animal}: {animals[animal]}</h3>)}
                </>
            )
        }
    }

    return (
        <>
            {renderFarm()}
            <button>set name as FULL</button>
        </>
    )
}