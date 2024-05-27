import { createFileRoute } from '@tanstack/react-router'
// import { Mapa } from 'components/organisms'
import { getInfoData } from 'services/data'
import { z } from 'zod'

export const Route = createFileRoute('/')({
    // component: Mapa,
    loaderDeps: ({ search: { camada, esfera, estados } }) => ({ camada, esfera, estados }),
    loader: ({ deps: { camada, esfera, estados } }) => getInfoData(camada, esfera, estados),
    validateSearch: z.object({
        camada: z.number().optional(),
        esfera: z.number().optional(),
        estados: z.array(z.string()).optional()
    }),
})
