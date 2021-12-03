import React, {createContext, FC, useState} from "react";

type setModalFn = (el: JSX.Element) => void;
type IModalContext = {
    setModal: setModalFn;
    closeModal: () => void;
}

export const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider: FC = ({children}) => {

    const [modalVisible, setVisibility] = useState<boolean>(false);

    const [component, setComponent] = useState<JSX.Element | null>(null);

    const setModal: setModalFn = (el) => {
        setVisibility(true);
        setComponent(el);
    }

    const closeModal = () => {
        setVisibility(false);
        setComponent(null);
    }

    return (
        <ModalContext.Provider value={{setModal, closeModal}}>

            {modalVisible && component ? component : null}

            {children}

        </ModalContext.Provider>
    );
}