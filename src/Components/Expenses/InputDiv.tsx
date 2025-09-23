import { MoneyIcon } from "../../assets/icons";

type InputDivProps = {
  text: string;
  inputName: string;
  placeholder: string;
  type: string;
  value: string | number;
  setValue: (val: string) => void;
  addToTable: () => void;
};

function InputDiv({
  text,
  inputName,
  placeholder,
  type,
  value,
  setValue,
  addToTable,
}: InputDivProps) {
  return (
    <div className="flex flex-col gap-3 max-w-100 md:max-w-80 lg:mt-4">
      <label htmlFor={inputName} className="font-1 text-2xl">
        {text}
      </label>
      <div className="flex border-light-blue rounded-sm overflow-hidden border-1 shadow-md shadow-black/16">
        {type === "number" ? (
          <MoneyIcon className="h-13 p-3 w-13 bg-gradient-to-r from-light-blue to-dark-blue lg:h-12 lg:w-14" />
        ) : (
          ""
        )}
        <input
          type={type}
          name={inputName}
          id={inputName}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={function (e) {
            if (e.key === "Enter") {
              addToTable();
            }
          }}
          className="px-3 py-2 border-0 font-2 text-2xl outline-none w-full bg-light-bg  text-text-grey font-bold lg:text-lg"
        />

        {type === "number" ? (
          <button
            className="h-13 w-13 aspect-square bg-dark-blue rounded-md cursor-pointer hover:brightness-150 duration-200 lg:h-12 lg:w-14"
            onClick={addToTable}
          >
            +
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default InputDiv;
