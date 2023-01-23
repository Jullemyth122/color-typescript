import React, { createContext, useContext, useState } from 'react'
import { ColorState } from '../coloring-component/types3';
import { ColorContextValue, initialValue } from './color';

type ColorContextProviderProps = {
    children: React.ReactNode
}

export const CreateColorContext = createContext<ColorContextValue>(initialValue);

export const UseColor = () => {
    return useContext(CreateColorContext);
}

export const ColorContextProvider = ({children}: ColorContextProviderProps) => {

    const [colorList, setColorList] = useState<ColorState[]>([]);

    const handleAddCollection = (e: any, item:ColorState) => {
        setColorList([...colorList, item])
        console.log(colorList)
    }

    const handleDeleteCollection = (e: any) => {

    }

    const value = {
        handleAddCollection,
        handleDeleteCollection,
        colorList
    }

    return (
        <CreateColorContext.Provider value={value}>
            {children}
        </CreateColorContext.Provider >
    )
}
