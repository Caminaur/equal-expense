import Navbar from "../Components/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-screen w-full bg-gradient-to-t from-light-blue to-dark-blue md:bg-gradient-to-r flex flex-col p-4 overflow-hidden items-center lg:gap-4">
    <Navbar />
    <div className="h-full w-full p-0 lg:max-w-200 lg:max-h-10/12 lg:mt-8">
      <div className="h-full w-full bg-white/20 rounded-2xl text-light-font">
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
