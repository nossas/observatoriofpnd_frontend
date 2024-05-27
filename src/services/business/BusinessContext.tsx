import { createContext } from "react"

const defaultMapZoom = parseInt(import.meta.env.VITE_MAP_DEFAULT_ZOOM)
const defaultMapCenter = import.meta.env.VITE_MAP_DEFAULT_CENTER
    .split(',')
    .map((value: string) => parseFloat(value)) as [number, number]

interface BusinessContextProps {
    mapCenter: [number, number]
    mapData: {
        [x:string]: any;
    }
    mapZoom: number
    setMapCenter: React.Dispatch<React.SetStateAction<[number, number]>>
    setMapZoom: React.Dispatch<React.SetStateAction<number>>
}

export const defaultState = {
    isLoading: true,
    mapData: {},
    mapCenter: defaultMapCenter,
    mapZoom: defaultMapZoom,
    setIsLoading: () => {},
    setMapCenter: () => {},
    setMapZoom: () => {},
}

export const BusinessContext = createContext<BusinessContextProps>(defaultState)
