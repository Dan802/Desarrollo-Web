import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy } from "react"
const IndexPage = lazy(() => import('./views/IndexPage'))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route> 
          <Route index path="/" element={

              <IndexPage />
            
          } />
          
          
        </Route>
      </Routes>

    </BrowserRouter>
  )
}
