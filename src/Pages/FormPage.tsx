import { MoneyIcon, PlayIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

type InputDivProps = {
  text: string;
  inputName: string;
  placeholder: string;
};

const InputDiv = ({ text, inputName, placeholder }: InputDivProps) => (
  <div className="flex flex-col gap-3 max-w-100 lg:mt-4">
    <label htmlFor={inputName} className="font-2 text-2xl">
      {text}
    </label>
    <div className="flex border-light-blue rounded-sm overflow-hidden border-1 shadow-md shadow-black/16">
      <MoneyIcon className="h-15 p-3 w-17 bg-gradient-to-r from-light-blue to-dark-blue lg:h-12 lg:w-14" />
      <input
        type="number"
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        className="px-3 border-0 font-2 text-3xl outline-none w-full bg-light-bg  text-text-grey font-bold lg:text-lg"
      />
    </div>
    <div className="h-0.5 w-full bg-light-bg/50 my-2"></div>
  </div>
);

function FormPage() {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full p-0 lg:max-w-200 lg:max-h-9/12 lg:mt-8">
      <div className="h-full w-full bg-white/20 rounded-2xl p-8 lg:p-6 text-light-font flex flex-col justify-around">
        <InputDiv
          inputName="user-1-salary"
          placeholder="1400..."
          text={t("form.label1")}
        />
        <InputDiv
          inputName="user-2-salary"
          placeholder="1200..."
          text={t("form.label2")}
        />
        <InputDiv
          inputName="expenses"
          placeholder="950"
          text={t("form.label3")}
        />
        <Link
          to={"/sharedExpenses"}
          className="bg-light-blue flex items-center justify-between px-4 py-4 rounded-lg text-white w-full mt-auto text-2xl max-w-80 shadow-sm shadow-black/40 hover:shadow-md duration-200 cursor-pointer hover:brightness-120 transition-all"
        >
          <Trans i18nKey="form.buttonText"></Trans>
          <PlayIcon className="" />
        </Link>
      </div>
    </div>
  );
}

export default FormPage;
