import { Link } from "react-router-dom";
import { PlayIcon } from "../assets/icons";

function InfoPage() {
  return (
    <div className="h-full w-full p-0 lg:max-w-200 lg:max-h-10/12 lg:mt-8">
      <div className="h-full w-full bg-white/20 rounded-2xl p-8 text-light-font flex flex-col">
        <p className="font-2 text-lg pt-3 md:w-2/3 text-shadow-sm text-shadow-black/50 sm:pt-6">
          This application divides expenses proportionally according to each
          person's salary, so both contribute the same percentage of their
          income.
        </p>
        {/* example */}
        <div className="bg-dark-bg/70 rounded-lg p-6 text-light-font font-2 text-lg my-6 shadow-lg shadow-dark-bg/30">
          <p>
            <span className="text-example-pink">Lisa</span> earns{" "}
            <span className="text-example-green">$2000</span>
          </p>
          <p>
            <span className="text-example-blue">Tom</span> earns{" "}
            <span className="text-example-green">$1000</span>
          </p>
          <div className="my-4 md:my-10"></div>
          <p>
            <span>
              Expenses: <span className="text-example-red">€1000</span>
            </span>
          </p>
          <div className="my-4 sm:my-10"></div>
          <p>
            <span className="text-example-pink">Lisa</span> should pay
            <span className="text-example-green"> €666</span> {" --> "} 33% of
            her salary.
          </p>
          <p>
            {" "}
            While <span className="text-example-blue">Tom</span> should pay{" "}
            <span className="text-example-green">€333</span>
            {" --> "} 33% of his salary.
          </p>
        </div>
        <Link
          to={"/form"}
          className="bg-light-blue flex items-center justify-between px-4 py-4 rounded-lg text-white w-full mt-auto text-2xl max-w-80 shadow-sm shadow-black/40 hover:shadow-md duration-200 cursor-pointer hover:brightness-120 transition-all"
        >
          Calculate Expenses <PlayIcon className="" />
        </Link>
      </div>
    </div>
  );
}

export default InfoPage;
