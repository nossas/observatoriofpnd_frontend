import { BusinessContext, defaultState } from "./BusinessContext"
import { ReactNode, useEffect, useState } from "react"
import { getMapData } from "services/data"
import i18n from "services/i18n"

export const BusinessProvider = ({ children }: { children: ReactNode }) => {

    const [ entendaIsOpen, setEntendaIsOpen ] = useState(defaultState.entendaIsOpen)
    const [ mapCenter, setMapCenter ] = useState(defaultState.mapCenter)
    const [ mapData, setMapData ] = useState(defaultState.mapData)
    const [ mapZoom, setMapZoom ] = useState(defaultState.mapZoom)
    const [language, setLanguage] = useState(defaultState.language)
    
    useEffect(() => {
        loadMapData()
    }, [])

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    const loadMapData = async () => {
        const _mapData = await getMapData()
        setMapData(_mapData)
    }

    return (
        <BusinessContext.Provider
            value={{
                entendaIsOpen,
                mapCenter,
                mapData,
                mapZoom,
                language,
                setEntendaIsOpen,
                setMapCenter,
                setMapZoom,
                setLanguage
            }}
        >
            { children }
        </BusinessContext.Provider>
    )
}
