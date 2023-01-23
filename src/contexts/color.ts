import { ColorState } from "../coloring-component/types3";

export interface Color {
    id: number;
    colorhex: string;
    colorRGB: number[];
    colorHSL: string;
}

export type ColorContextValue = {
    handleAddCollection: (e: any, item:ColorState) => void,
    handleDeleteCollection: (e: any) => void,
    colorList: ColorState[]
}

export const initialValue: ColorContextValue = {
    handleAddCollection: (e: any) => {},
    handleDeleteCollection: (e: any) => {},
    colorList: []
}
