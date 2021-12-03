import {FC, useState} from "react";

type ModalProps = {
    children<T>(data: T): JSX.Element;
}
export const ModalCard1: FC<ModalProps> = ({children}) => {
    const [data, setData] = useState(1);

    return (
        <>
            <h5>
                <button onClick={() => setData(n => n + 1)}>
                    ModalCard1
                </button>
            </h5>
            {children(data)}
        </>
    );
}