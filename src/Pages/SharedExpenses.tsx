import { PlayIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import ExpenseTable from "../Components/Expenses/Table";
import { useEffect, useState } from "react";
import InputDiv from "../Components/Expenses/InputDiv";
import { formatNumber } from "../utils";

type Expense = {
  expense: string;
  amount: number;
};

type FormData = {
  name: string;
  price: string;
  nameError: string | null;
  priceError: string | null;
};

function SharedExpenses() {
  const { t } = useTranslation();
  const [data, setData] = useState<Expense[]>(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    nameError: null,
    priceError: null,
  });

  function addExpense() {
    const isThereName = formData.name;
    const isTherePrice = formData.price;
    const isPriceBiggerThanZero = parseInt(formData.price) > 0;
    let nameError: string | null = null;
    let priceError: string | null = null;

    if (!isThereName) {
      nameError = t("expenses.nameError");
    }
    if (!isTherePrice || !isPriceBiggerThanZero) {
      priceError = t("expenses.priceError");
    }

    if (nameError || priceError) {
      setFormData({
        ...formData,
        nameError,
        priceError,
      });
      return;
    }

    const newData = [
      ...data,
      {
        expense: formData.name,
        amount: Number(formData.price),
      },
    ];
    setData(newData);
    setFormData({ name: "", price: "", nameError: null, priceError: null });
    document.getElementById("expense")?.focus();
  }
  function removeExpense(index: number) {
    let newData = data.filter((_, i) => i !== index);

    setData(newData);
  }
  function getTotal() {
    let total: number = 0;
    for (const e of data) {
      total += e.amount;
    }

    return formatNumber(total);
  }

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setData(storedExpenses);
  }, []);

  return (
    <div className="h-full w-full p-0 lg:max-w-200 lg:max-h-9/12 lg:mt-8">
      <div className="h-full w-full bg-white/20 rounded-2xl p-2 sm:p-8 lg:p-6 text-light-font flex flex-col justify-between gap-4">
        <div>
          <p className="w-fit font-1 text-lg py-1 md:py-3 text-shadow-sm text-shadow-black/50 border-t-6 border-b-6 border-light-bg/80 ">
            {t("expenses.title")}
          </p>
        </div>
        <div className="flex flex-col gap-3 justify-between md:flex-row md:gap-6 h-full">
          <div className="flex flex-col gap-4">
            <InputDiv
              inputName="expense"
              id="expense"
              placeholder={t("expenses.labelNamePlaceHolder")}
              text={t("expenses.labelName")}
              type="string"
              value={formData.name}
              setValue={(val) => setFormData({ ...formData, name: val })}
              addToTable={addExpense}
              error={formData.nameError}
              onEnter={() => {
                document.getElementById("cost")?.focus();
              }}
            />
            <div className="flex items-end">
              <InputDiv
                inputName="cost"
                id="cost"
                placeholder="1200..."
                text={t("expenses.labelAmount")}
                value={formData.price}
                setValue={(val) => setFormData({ ...formData, price: val })}
                addToTable={addExpense}
                type="number"
                error={formData.priceError}
                onEnter={() => {}}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {data.length !== 0 ? (
              <ExpenseTable data={data} onRemove={removeExpense} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <p className="font-2 text-2xl md:w-2/3 text-shadow-sm text-shadow-black/50 mt-auto">
            {t("expenses.total")} {getTotal()}
          </p>
        </div>
        <Link
          to={"/form"}
          className="bg-light-blue flex items-center justify-between px-4 py-4 rounded-lg text-white w-full text-2xl max-w-80 shadow-sm shadow-black/40 hover:shadow-md duration-200 cursor-pointer hover:brightness-120 transition-all"
        >
          <Trans i18nKey="form.buttonText"></Trans>
          <PlayIcon className="" />
        </Link>
      </div>
    </div>
  );
}

export default SharedExpenses;
