import { createContext } from "react"
import { getDefaultLanguage } from "services/utils/getDefaultLanguage"

const defaultMapZoom = parseInt(import.meta.env.VITE_MAP_DEFAULT_ZOOM)
const defaultMapCenter = import.meta.env.VITE_MAP_DEFAULT_CENTER
    .split(',')
    .map((value: string) => parseFloat(value)) as [number, number]

export type LanguageType = 'pt_BR' | 'en_US' | 'es_ES'

interface BusinessContextProps {
    entendaIsOpen: boolean,
    mapCenter: [number, number]
    mapData: {
        [x:string]: any;
    }
    mapZoom: number
    language: LanguageType
    setEntendaIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
    setMapCenter: React.Dispatch<React.SetStateAction<[number, number]>>
    setMapZoom: React.Dispatch<React.SetStateAction<number>>
    setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>
}

export const defaultState = {
    entendaIsOpen: true,
    isLoading: true,
    mapData: {},
    mapCenter: defaultMapCenter,
    mapZoom: defaultMapZoom,
    language: getDefaultLanguage() as LanguageType,
    setEntendaIsOpen: () => {},
    setIsLoading: () => {},
    setMapCenter: () => {},
    setMapZoom: () => {},
    setLanguage: () => {}
}

export const BusinessContext = createContext<BusinessContextProps>(defaultState)
