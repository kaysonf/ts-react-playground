import React, {FC, useContext, useState} from 'react';
import './App.css';
import {ModalContext} from "./Modal/ModalContext";
import {ModalCard1} from "./Modal/ModalCard";
import {ModalFooter} from "./Modal/ModalWrapper";
import {StateTypeDesignComp} from "./StateTypeDesign/Component";
import {RenderingComp} from "./RenderingAndStates/RenderingComp";
import {ProviderAppTest} from "./ProviderRendering/ProviderRender";
import {WhoRenders} from "./WhoRenders/WhoRenders";
import {HooksTest} from "./WhoRenders/HooksTest";
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

            {/*<FormApp/>*/}

            {/*<StateTypeDesignComp/>*/}

            {/*<RenderingComp/>*/}

            {/*<ProviderAppTest/>*/}

            {/*<WhoRenders/>*/}

            {/*<HooksTest/>*/}
        </div>
    );
}

export default App;
