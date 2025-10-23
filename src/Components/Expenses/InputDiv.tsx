import { MoneyIcon } from "../../assets/icons";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

type InputDivProps = {
  text: string;
  inputName: string;
  id: string;
  placeholder: string;
  type: string;
  value: string | number;
  error: string | null;
  setValue: (val: string) => void;
  addToTable: () => void;
  onEnter: () => void;
};

function InputDiv({
  text,
  inputName,
  id,
  placeholder,
  type,
  value,
  setValue,
  addToTable,
  error,
  onEnter,
}: InputDivProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-3 max-w-100 md:max-w-80 lg:mt-4">
      <label htmlFor={inputName} className="font-1 text-lg ">
        {text}
      </label>
      <div className="flex border-light-blue rounded-sm overflow-hidden border-1 shadow-md shadow-black/16 z-20">
        {type === "number" ? (
          <MoneyIcon className="h-12 p-3 w-13 bg-gradient-to-r from-light-blue to-dark-blue lg:h-12 lg:w-14" />
        ) : (
          ""
        )}
        <input
          type={type}
          name={inputName}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={function (e) {
            if (e.key === "Enter") {
              addToTable();
              onEnter();
            }
          }}
          className={clsx(
            "px-3 py-2 border-0 font-2 text-lg outline-none w-full bg-light-bg  text-text-grey font-bold lg:text-lg",
            error ? "border-error-red border-2" : ""
          )}
        />

        {type === "number" ? (
          <button
            className="h-12 w-12 aspect-square bg-dark-blue rounded-r-md cursor-pointer hover:brightness-150 duration-200 lg:h-12 lg:w-14"
            onClick={addToTable}
          >
            +
          </button>
        ) : (
          ""
        )}
      </div>
      <AnimatePresence>
        {error ? (
          <div className="relative h-0 ">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              className="font-2 font-bold text-error-red/90 border-2 border-red-700 bg-dark-blue rounded-lg p-2  text-shadow-lg text-shadow-black/30 z-999 absolute"
            >
              {error}
            </motion.p>
          </div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
}

export default InputDiv;
