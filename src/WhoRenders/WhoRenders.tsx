import {FC, memo, useState} from "react";

const GrandChild: FC = () => {
    console.log('grandchild rendered');
    return <>sup</>
}

const MemoGrandChild = memo(GrandChild);

const Child: FC<{n: number}> = () => {
    return (
        <>
            <MemoGrandChild/>
        </>
    )
}

export const WhoRenders: FC = () => {
    const [n, sn] = useState(1);

    return (<><button onClick={() => sn(n => n + 1)}><Child n={n}/></button></>)
}