import React, {FC, ReactElement} from "react";

type ModalWrapperProps = {
    onClose: () => void;
}
export const ModalWrapper: FC<ModalWrapperProps> = (props) => {
    const {children, onClose} = props;

    return (
        <>
            <h1 onClick={onClose}>Modal Header</h1>
            {children}
        </>
    )
}

type ModalFooterProps = {
    onOk: Function;
}

export function ModalFooter({onOk}: ModalFooterProps): ReactElement {
    return (
        <button onClick={() => onOk()}>
            modalButton
        </button>
    )
}