import { BusinessProvider } from 'services/business'
import { ConfigProvider } from 'antd';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from 'routeTree.gen' // Import the generated route tree
import { customTheme } from './theme'
import { TourProvider } from 'services/tour'
import { MapLoadingProvider } from 'services/mapLoading'
import { GuidedTour, MapLoadingOverlay } from 'components/molecules'
import 'assets/styles/global.css'

// Create a new router instance
const router = createRouter({
    routeTree,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
    return (
        <ConfigProvider theme={customTheme}>
            <MapLoadingProvider>
                <TourProvider>
                    <BusinessProvider>
                        <RouterProvider router={router} />
                        <GuidedTour />
                        <MapLoadingOverlay />
                    </BusinessProvider>
                </TourProvider>
            </MapLoadingProvider>
        </ConfigProvider>
    )
}

export default App
