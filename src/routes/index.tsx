import { createFileRoute } from '@tanstack/react-router'
// import { Mapa } from 'components/organisms'
import { getInfoData } from 'services/data'
import { z } from 'zod'

export const Route = createFileRoute('/')({
    // component: Mapa,
    loaderDeps: ({ search: { camada, esfera, estados, fpnd } }) => ({ camada, esfera, estados, fpnd}),
    loader: ({ deps: { camada, esfera, estados, fpnd } }) => getInfoData(camada, esfera, estados ,fpnd),
    validateSearch: z.object({
        camada: z.number().optional(),
        esfera: z.number().optional(),
        estados: z.array(z.string()).optional(),
        fpnd: z.string().optional()
    }),
})
