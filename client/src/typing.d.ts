export interface IStarship {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: Date;
    crew: string;
    edited: Date;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    films: string[] | IFilm[];
    pilots: string[] | IPeople[];
    starship_class: string;
    url: string;
}
export interface IVehicle {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: Date;
    crew: string;
    edited: Date;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: string[] | IPeople[];
    films: string[] | IFilm[];
    url: string;
    vehicle_class: string;
}

export enum ResourcesType {
    Starships = 'starships',
    Vehicles = 'vehicles',
}


export type ListResponsesResult = IFilm | IPeople | IPlanet | ISpecie | IStarship | IVehicle