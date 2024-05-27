import { BusinessProvider } from 'services/business'
import { ConfigProvider } from 'antd';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from 'routeTree.gen' // Import the generated route tree
import { customTheme } from './theme'
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
            <BusinessProvider>
                <RouterProvider router={router} />
            </BusinessProvider>
        </ConfigProvider>
    )
}

export default App
