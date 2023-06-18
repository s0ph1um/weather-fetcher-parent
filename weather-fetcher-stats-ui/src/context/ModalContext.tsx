import React, {createContext, useState} from 'react'

interface IModalContext {
    opened: boolean
    openModal: () => void
    closeModal: () => void
}

export const ModalContext = createContext<IModalContext>({
    opened: false,
    openModal: (): void => { },
    closeModal: (): void => { }
})

export const ModalState = ({children}: { children: React.ReactNode }) => {
    const [opened, setOpened] = useState(false)

    console.log(children)
    const openModal = () => setOpened(true)

    const closeModal = () => setOpened(false)

    return (
        <ModalContext.Provider value={{opened, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}
