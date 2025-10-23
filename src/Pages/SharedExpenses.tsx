import { PlayIcon } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import ExpenseTable from "../Components/Expenses/Table";
import { useEffect, useState } from "react";
import InputDiv from "../Components/Expenses/InputDiv";
import { formatNumber } from "../utils";
import { AnimatePresence, motion } from "motion/react";

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
  const navigate = useNavigate();
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

  const [expenseAmountError, setExpenseAmountError] = useState<string | null>(
    null
  );

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

  useEffect(() => {
    if (expenseAmountError) {
      const timer = setTimeout(() => {
        setExpenseAmountError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [expenseAmountError]);
  useEffect(() => {
    if (formData.nameError || formData.priceError) {
      const timer = setTimeout(() => {
        setFormData({ ...formData, nameError: null, priceError: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formData.nameError, formData.priceError]);

  return (
    <div className="h-full w-full p-4 sm:p-8 lg:p-6 text-light-font flex flex-col justify-between gap-2 md:gap-4 lg:gap-2">
      <div>
        <p className="w-fit font-1 text-lg py-1 md:py-3 text-shadow-sm text-shadow-black/50 border-t-6 border-b-6 border-light-bg/80 ">
          {t("expenses.title")}
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-between md:flex-row md:gap-6 h-full ">
        <div className="flex flex-col gap-2 md:gap-4">
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
        <div className="flex-1 overflow-y-auto lg:flex-4/12">
          {data.length !== 0 ? (
            <ExpenseTable data={data} onRemove={removeExpense} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <AnimatePresence>
          {expenseAmountError ? (
            <div className="">
              <motion.p
                onClick={() => setExpenseAmountError(null)}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
                className="font-2 font-bold text-error-red text-shadow-lg text-shadow-black/30 z-10"
              >
                {expenseAmountError}
              </motion.p>
            </div>
          ) : (
            ""
          )}
        </AnimatePresence>
        <p className="font-2 text-lg md:w-2/3 text-shadow-sm text-shadow-black/50 mt-auto lg:text-lg">
          {t("expenses.total")} {getTotal()}
        </p>
      </div>
      <Link
        to={"/form"}
        className="bg-light-blue flex items-center justify-between px-3 py-3 rounded-lg text-white w-full text-lg max-w-80 shadow-sm shadow-black/40 hover:shadow-md duration-200 cursor-pointer hover:brightness-120 transition-all lg:text-lg lg:px-2 lg:py-2 lg:max-w-70"
        onClick={(e) => {
          e.preventDefault();
          if (data.length < 3) {
            const error = "Tienes que agregar al menos 3 gastos!";
            setExpenseAmountError(error);
          } else {
            navigate("/graphs");
          }
        }}
      >
        <Trans i18nKey="form.buttonText"></Trans>
        <PlayIcon className="" />
      </Link>
    </div>
  );
}

export default SharedExpenses;
