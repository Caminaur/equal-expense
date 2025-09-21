import { MoneyIcon, PlayIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import ExpenseTable from "../Components/Expenses/Table";
import { useState } from "react";
import InputDiv from "../Components/Expenses/InputDiv";

type Expense = {
  expense: string;
  amount: number;
};

function SharedExpenses() {
  const { t } = useTranslation();
  const [data, setData] = useState<Expense[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  function addExpense() {
    if (!formData.name || !formData.price) return;
    setData([
      ...data,
      { expense: formData.name, amount: Number(formData.price) },
    ]);
    setFormData({ name: "", price: "" });
  }

  return (
    <div className="h-full w-full p-0 lg:max-w-200 lg:max-h-9/12 lg:mt-8">
      <div className="h-full w-full bg-white/20 rounded-2xl p-8 lg:p-6 text-light-font flex flex-col justify-around gap-4">
        <div>
          <div className="h-1.5 w-full bg-light-bg/80 my-2"></div>
          <p className="font-1 text-lg md:w-2/3 text-shadow-sm text-shadow-black/50">
            Let's add your shared expenses!
          </p>
          <div className="h-1.5 w-full bg-light-bg/80 my-2"></div>
        </div>

        <InputDiv
          inputName="user-1-salary"
          placeholder="Rent..."
          text="Expense name"
          type="string"
          value={formData.name}
          setValue={(val) => setFormData({ ...formData, name: val })}
          addToTable={addExpense}
        />
        <div className="flex items-end">
          <InputDiv
            inputName="user-2-salary"
            placeholder="1200..."
            text="Amount"
            value={formData.price}
            setValue={(val) => setFormData({ ...formData, price: val })}
            addToTable={addExpense}
            type="number"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {data.length !== 0 ? <ExpenseTable data={data} /> : ""}
        </div>
        <Link
          to={"/form"}
          className="bg-light-blue flex items-center justify-between px-4 py-4 rounded-lg text-white w-full mt-auto text-2xl max-w-80 shadow-sm shadow-black/40 hover:shadow-md duration-200 cursor-pointer hover:brightness-120 transition-all"
        >
          <Trans i18nKey="form.buttonText"></Trans>
          <PlayIcon className="" />
        </Link>
      </div>
    </div>
  );
}

export default SharedExpenses;
