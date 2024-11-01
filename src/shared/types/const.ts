import {City} from "./city.enum.js";
import {Coordinates} from "./coordinates.type.js";

export const cityCoordinates: Map<string, Coordinates> =
    new Map(
        Object.entries({
            [City.Paris]: {latitude: 48.85661, longitude: 2.351499},
            [City.Cologne]: {latitude: 50.938361, longitude: 6.959974},
            [City.Brussels]: {latitude: 50.846557, longitude: 4.351697},
            [City.Amsterdam]: {latitude: 52.370216, longitude: 4.895168},
            [City.Hamburg]: {latitude: 53.550341, longitude: 10.000654},
            [City.Dusseldorf]: {latitude: 51.225402, longitude: 6.776314},
        })
    );
