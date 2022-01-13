import {createContext, Dispatch, FC, memo, SetStateAction, useContext, useState} from "react";

type ICtx = {
    n: number
    s: Dispatch<SetStateAction<number>>
}

const Ctx = createContext<ICtx>({n: 1, s: () => null});

const TheProvider: FC = ({children}) => {
    const [n, s] = useState(1);
    console.log('provider')
    return (
        <Ctx.Provider value={{s, n}}>
            {children}
        </Ctx.Provider>
    );
}

const ConsumerComp: FC<{index: number}> = (props) => {
    console.log('consumer', props.index)
    const {s, n} = useContext(Ctx);
    return <></>
}

const PureConsumer = memo(ConsumerComp);

export const ProviderAppTest: FC = () => {
    const [someState, ss] = useState(100);
    const x = [1,2,3,4,5];
    return (
        <TheProvider>
            <button onClick={() => ss(v => v+1)}>render app {someState}</button>
            {x.map(i => <PureConsumer index={i}/>)}
        </TheProvider>
    )
}