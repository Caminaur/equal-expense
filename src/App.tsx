import FormPage from "./Pages/FormPage";
import SharedExpenses from "./Pages/SharedExpenses";
import InfoPage from "./Pages/InfoPage";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Routes,
} from "react-router-dom";
import ResultPage from "./Pages/ResultPage";
import Layout from "./Layouts/Layout";

const ComponentView = () => {
  const { component } = useParams();

  let ComponentToRender: React.ComponentType;
  switch (component) {
    case "home":
      ComponentToRender = ResultPage;
      // ComponentToRender = InfoPage;
      break;
    case "form":
      ComponentToRender = FormPage;
      break;
    case "sharedExpenses":
      ComponentToRender = SharedExpenses;
      break;
    case "info":
      ComponentToRender = InfoPage;
      break;
    default:
      ComponentToRender = ResultPage;
      ComponentToRender = InfoPage;
  }

  return (
    <Layout>
      <ComponentToRender />
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComponentView />} />
        <Route path="/:component" element={<ComponentView />} />
      </Routes>
    </Router>
  );
}

export default App;
