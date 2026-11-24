import { createBrowserRouter } from "react-router";
import Site, { type SitePage } from "./Site";

function Page({ page }: { page: SitePage }) {
  return <Site page={page} />;
}

function NotFound() {
  return (
    <main className="not-found">
      <span>404</span>
      <h1>Такой страницы нет</h1>
      <p>Но любимые блюда и тёплые встречи по-прежнему ждут вас.</p>
      <a href="/">Вернуться на главную</a>
    </main>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <Page page="home" /> },
  { path: "/menu", element: <Page page="menu" /> },
  { path: "/about", element: <Page page="about" /> },
  { path: "/delivery", element: <Page page="delivery" /> },
  { path: "*", Component: NotFound },
]);
