/**
 * Contexto para gerenciar o estado de carregamento do mapa
 */

import React, { createContext, useState, useCallback, useMemo } from 'react';

interface MapLoadingContextType {
  isMapLoaded: boolean;
  setMapLoaded: (loaded: boolean) => void;
}

export const MapLoadingContext = createContext<MapLoadingContextType | undefined>(undefined);

interface MapLoadingProviderProps {
  children: React.ReactNode;
}

export const MapLoadingProvider: React.FC<MapLoadingProviderProps> = ({ children }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleSetMapLoaded = useCallback((loaded: boolean) => {
    setIsMapLoaded(loaded);
  }, []);

  const value: MapLoadingContextType = useMemo(
    () => ({
      isMapLoaded,
      setMapLoaded: handleSetMapLoaded,
    }),
    [isMapLoaded, handleSetMapLoaded]
  );

  return (
    <MapLoadingContext.Provider value={value}>
      {children}
    </MapLoadingContext.Provider>
  );
};

export const useMapLoading = () => {
  const context = React.useContext(MapLoadingContext);
  if (!context) {
    throw new Error('useMapLoading deve ser usado dentro de um MapLoadingProvider');
  }
  return context;
};
