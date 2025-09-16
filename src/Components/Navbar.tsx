import { LangIcon, InfoIcon, LangIconMobile } from "../assets/icons";
import { Link } from "react-router-dom";
import useDropdown from "../Hooks/useDropdown";

function Navbar() {
  const { active, setActive, dropdownRef } = useDropdown();

  type ButtonLangeProps = {
    displayName: string;
    dbname: string;
    selected?: boolean | null;
  };
  const ButtonLang = ({ displayName, dbname, selected }: ButtonLangeProps) => (
    <button
      name={dbname}
      className={`w-full py-2  hover:brightness-125 text-left pl-2 rounded-xs cursor-pointer text-light font-2 font-medium select-none ${
        selected ? "bg-dark-blue/90" : "bg-dark-blue/60"
      }`}
    >
      {displayName}
    </button>
  );
  return (
    <div className="w-full flex justify-between items-center pb-4 lg:bg-light lg:max-w-200 lg:pb-default lg:py-3 lg:px-4 lg:rounded-lg relative">
      <Link to={"/"} className="text-white text-2xl font-1 lg:text-text-dark">
        Shared Expenses
      </Link>
      <div className="flex items-center gap-2">
        <Link to={"info"}>
          <InfoIcon className="h-12 w-12 lg:h-16 lg:w-16 duration-200 transition-all hover:brightness-150 cursor-pointer"></InfoIcon>
        </Link>
        <div ref={dropdownRef}>
          <li
            className="list-none "
            onClick={() => {
              setActive((prev) => !prev);
            }}
          >
            <LangIcon className="h-12 w-12 hidden lg:block lg:h-16 lg:w-16 duration-200 transition-all hover:brightness-150 cursor-pointer "></LangIcon>
            <LangIconMobile className="h-12 w-12 lg:hidden"></LangIconMobile>

            <div
              className={`min-w-50 min-h-40 bg-light absolute right-0 top-full -mt-2 rounded-sm transition-all duration-300 ${
                active ? "opacity-100 mt-2" : "opacity-0 pointer-events-none"
              }`}
            >
              <ul className="flex flex-col p-4 gap-2">
                <ButtonLang
                  dbname="English"
                  displayName="Englisch"
                  selected={true}
                />
                <ButtonLang dbname="Spanish" displayName="Spanisch" />
                <ButtonLang dbname="German" displayName="Deutsch" />
              </ul>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
