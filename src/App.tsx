import React, {FC, useContext, useState} from 'react';
import './App.css';
import {ModalContext, ModalProvider} from "./Modal/ModalContext";
import {ModalCard1} from "./Modal/ModalCard";
import {ModalFooter} from "./Modal/ModalWrapper";
import {OptimizeData} from "./OptimizeDataState/OptimizeData";

const ChildComp: FC = () => {

    const [open, setOpen] = useState(true);

    const {setModal, closeModal} = useContext(ModalContext);

    const onClick = () => {
        if (open)
            setModal(
                <>
                    <ModalCard1>
                        {(data) => <ModalFooter onOk={() => console.log(data)}/>}
                    </ModalCard1>
                </>
            );

        else
            closeModal()

        setOpen(b => !b);
    }

    return (<button onClick={() => onClick()}>child comp</button>);
}

function App() {

    return (
        <div className="App">

            {/*<ReducerTypingComponent/>*/}

            {/*<ModalProvider>*/}
            {/*    <ChildComp/>*/}
            {/*</ModalProvider>*/}

            <OptimizeData/>

        </div>
    );
}

export default App;
