import { LangIcon, InfoIcon, LangIconMobile, PlayIcon } from "./assets/icons";

function App() {
  return (
    <div className="h-screen w-full bg-gradient-to-t from-light-blue to-dark-blue md:bg-gradient-to-r flex flex-col p-4 overflow-hidden">
      {/*  navbar */}
      <div className="w-full flex justify-between items-center pb-4">
        <span className="text-white text-2xl font-1">Shared Expenses</span>
        <div className="flex items-center gap-2">
          <InfoIcon className="h-12 w-12"></InfoIcon>
          {/* <LangIcon></LangIcon> */}
          <LangIconMobile className="h-12 w-12"></LangIconMobile>
        </div>
      </div>

      {/* content */}
      <div className="h-full w-full p-0">
        <div className="h-full w-full bg-white/20 rounded-2xl p-8 text-white flex flex-col">
          <p className="font-2 text-lg py-6">
            This application divides expenses proportionally according to each
            person's salary, so both contribute the same percentage of their
            income.
          </p>
          {/* example */}
          <div className="bg-dark-bg/70 rounded-lg p-6 text-white font-2 text-lg my-6">
            <p>
              <span className="text-example-pink">Lisa</span> earns{" "}
              <span className="text-example-green">$2000</span>
            </p>
            <br />
            <p>
              <span className="text-example-blue">Tom</span> earns{" "}
              <span className="text-example-green">$1000</span>
            </p>
            <br />
            <p>
              <span>
                Expenses: <span className="text-example-red">€1000</span>
              </span>
            </p>
            <br />
            <p>
              <span className="text-example-pink">Lisa</span> should pay
              <span className="text-example-green"> €666</span> 33% of her
              salary. While <span className="text-example-blue">Tom</span>{" "}
              should pay <span className="text-example-green">€333</span> of his
              salary
            </p>
          </div>
          <button className="bg-light-blue flex items-center justify-between px-4 py-4 rounded-lg text-white w-full mt-auto text-2xl">
            Calculate Expenses <PlayIcon className="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
