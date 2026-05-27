import { createFileRoute } from '@tanstack/react-router'
import { LanguageType } from 'services/business/BusinessContext'
// import { Mapa } from 'components/organisms'
import { getInfoData } from 'services/data'
import { z } from 'zod'

export const Route = createFileRoute('/')({
    // component: Mapa,
    loaderDeps: ({ search: { camada, esfera, estados, fpnd } }) => ({ camada, esfera, estados, fpnd}),
    loader: ({ deps: { camada, esfera, estados, fpnd } }) => getInfoData(camada, esfera, estados ,fpnd),
    shouldReload: true,
    validateSearch: z.object({
        camada: z.number().optional(),
        esfera: z.number().optional(),
        estados: z.array(z.string()).optional(),
        fpnd: z.string().optional(),
        lang: z.custom<LanguageType>().optional(),
    }),
})
