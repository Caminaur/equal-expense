import Navbar from "./Components/Navbar";
import FormPage from "./Pages/FormPage";
import InfoPage from "./Pages/InfoPage";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Routes,
} from "react-router-dom";

const ComponentView = () => {
  const { component } = useParams();
  console.log(component);

  let ComponentToRender: React.ComponentType;
  switch (component) {
    case "home":
      ComponentToRender = InfoPage;
      break;
    case "form":
      ComponentToRender = FormPage;
      break;
    case "info":
      ComponentToRender = InfoPage;
      break;
    default:
      ComponentToRender = InfoPage;
  }

  return <ComponentToRender />;
};

function App() {
  return (
    <Router>
      <div className="h-screen w-full bg-gradient-to-t from-light-blue to-dark-blue md:bg-gradient-to-r flex flex-col p-4 overflow-hidden items-center lg:gap-4">
        {/*  navbar */}
        <Navbar />
        <Routes>
          <Route path="/" element={<ComponentView />} />
          <Route path="/:component" element={<ComponentView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
