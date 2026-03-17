import { PageBuilderProvider } from "./context/PageBuilderContext";
import PageBuilderPage from "./pages/PageBuilderPage";

/**
 * App
 * Root of the application. Wraps everything in the PageBuilderProvider
 * so all components have access to global state.
 *
 * To integrate with a router (react-router-dom), replace PageBuilderPage
 * here with a <Routes> tree.
 */
export default function App() {
  return (
    <PageBuilderProvider>
      <PageBuilderPage />
    </PageBuilderProvider>
  );
}
