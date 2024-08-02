export interface CategoryWithTypes{
    id: number;
    name: string;
    type_id: number;
    shortName: string;
}

export interface Locations{
    id: number;
    name: string;
    status: number;
    type_id: number;
    categorywithtype_id: number;
    shortName: string;
}