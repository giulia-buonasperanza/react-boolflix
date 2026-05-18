import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Film from "./pages/Film";
import NotFound from "./pages/NotFound";
import { GlobalContext, GlobalProvider } from "./contexts/GlobalContext";


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/films/:id" element={<Film />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
export default App;
