import { createLazyFileRoute } from '@tanstack/react-router'
import { Mapa } from 'components/organisms'

export const Route = createLazyFileRoute('/')({
    component: Mapa,
})
