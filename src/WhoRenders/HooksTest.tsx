import {FC, useEffect, useState} from "react";

const useAHook = (param: string) => {

    useEffect(() => {
        if (param)
            console.log(param);

        return function cleanup () {
            console.log('returned')
        };
    }, [param]);

    return {upper: param.toUpperCase()};
}

export const HooksTest: FC = () => {
    const [term, setTerm] = useState('');
    const {upper} = useAHook(term);
    return (
        <>
            <input type={'text'} value={term} onChange={e => setTerm(e.target.value)}/>
            <p>{upper}</p>
        </>
    )
}