import { RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import DigitalAI from './pages/DigitalAI'
import Contact from './pages/Contact'

const rootRoute = new RootRoute({
  component: Layout,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const digitalAiRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/digital-ai',
  component: DigitalAI,
})

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

const routeTree = rootRoute.addChildren([indexRoute, digitalAiRoute, contactRoute])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}
