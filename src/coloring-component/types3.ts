export interface COLORSLIST {
    id: number;
    colorhex: string;
    colorRGB: [number, number, number];
    colorRGBA: [number, number, number,number];
    colorHSL: string;
}

export interface ColorState {
    items: COLORSLIST[];
    selectedItem: COLORSLIST | null;
}