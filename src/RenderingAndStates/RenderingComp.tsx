import {FC, memo, useCallback, useState} from "react";

const NumberComp: FC<{ n: number; sn: () => void }> = (props) => {
    console.log('number comp rendered');
    const [s, ss] = useState(1);
    return <button onClick={() => {
        ss(5);
        props.sn()
    }}>increment {props.n} {s}</button>
}

const StrListComp: FC<{ s: string[]; ss: () => void }> = (props) => {
    console.log('string comp rendered');
    return (<button onClick={() => props.ss()}>
        <ul>
            {props.s.map(s => <li>{s}</li>)}
        </ul>
    </button>)

}

const MMStrListComp = memo(StrListComp);

export const RenderingComp: FC = () => {
    const [stateNumber, setStateNumber] = useState(0);
    const [stateString, setStateString] = useState(['ok']);

    const memoSS = useCallback(() => setStateString(v => [...v, 'a']), []);

    return (
        <>
            <NumberComp n={stateNumber} sn={() => setStateNumber(v => v + 1)}/>
            <MMStrListComp s={stateString} ss={memoSS}/>
        </>

    )
}