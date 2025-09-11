import Navbar from "./Components/Navbar";
import InfoPage from "./Pages/InfoPage";

function App() {
  return (
    <div className="h-screen w-full bg-gradient-to-t from-light-blue to-dark-blue md:bg-gradient-to-r flex flex-col p-4 overflow-hidden items-center lg:gap-4">
      {/*  navbar */}
      <Navbar />

      {/* content */}
      <InfoPage />
    </div>
  );
}

export default App;
