import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllMarket from './pages/allMarket/AllMarkets';
import MarketDetail from './pages/marketDetail/MarketDetail';
import "./App.css"
const router = createBrowserRouter([
  {
    path: "/",
    element: <AllMarket />,
  },
  {
    path: "/market/:market_id",
    element: <MarketDetail />,
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  </QueryClientProvider>
  )
}

export default App
