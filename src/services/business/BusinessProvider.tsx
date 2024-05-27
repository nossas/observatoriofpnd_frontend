import { BusinessContext, defaultState } from "./BusinessContext"
import { ReactNode, useEffect, useState } from "react"
import { getMapData } from "services/data"

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
    const [ mapCenter, setMapCenter ] = useState(defaultState.mapCenter)
    const [ mapData, setMapData ] = useState(defaultState.mapData)
    const [ mapZoom, setMapZoom ] = useState(defaultState.mapZoom)
    
    useEffect(() => {
        loadMapData()
    }, [])

    const loadMapData = async () => {
        const _mapData = await getMapData()
        setMapData(_mapData)
    }

    return (
        <BusinessContext.Provider
            value={{
                mapCenter,
                mapData,
                mapZoom,
                setMapCenter,
                setMapZoom,
            }}
        >
            { children }
        </BusinessContext.Provider>
    )
}
