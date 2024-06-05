import { createContext } from "react"

const defaultMapZoom = parseInt(import.meta.env.VITE_MAP_DEFAULT_ZOOM)
const defaultMapCenter = import.meta.env.VITE_MAP_DEFAULT_CENTER
    .split(',')
    .map((value: string) => parseFloat(value)) as [number, number]

interface BusinessContextProps {
    entendaIsOpen: boolean,
    mapCenter: [number, number]
    mapData: {
        [x:string]: any;
    }
    mapZoom: number
    setEntendaIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
    setMapCenter: React.Dispatch<React.SetStateAction<[number, number]>>
    setMapZoom: React.Dispatch<React.SetStateAction<number>>
}

export const defaultState = {
    entendaIsOpen: true,
    isLoading: true,
    mapData: {},
    mapCenter: defaultMapCenter,
    mapZoom: defaultMapZoom,
    setEntendaIsOpen: () => {},
    setIsLoading: () => {},
    setMapCenter: () => {},
    setMapZoom: () => {},
}

export const BusinessContext = createContext<BusinessContextProps>(defaultState)
