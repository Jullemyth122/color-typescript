export interface Item {
    id: number;
    name: string;
    description: string;
}

export interface AppState {
    items: Item[];
    selectedItem: Item | null;
}
