import { MoneyIcon, PlayIcon } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type InputDivProps = {
  value: string;
  text: string;
  inputName: string;
  placeholder: string;
  error: string | null;
  type: string;
  setValue: (val: string) => void;
};

const InputDiv = ({
  value,
  text,
  inputName,
  placeholder,
  error,
  setValue,
  type,
}: InputDivProps) => (
  <div className="flex flex-col gap-1 max-w-100 lg:mt-4">
    <label htmlFor={inputName} className="font-2 text-2xl">
      {text}
    </label>
    <div className="flex border-light-blue rounded-sm overflow-hidden border-1 shadow-md shadow-black/16">
      <MoneyIcon className="h-10 p-3 w-12 bg-gradient-to-r from-light-blue to-dark-blue lg:w-14 lg:h-14" />
      <input
        value={value}
        type={type}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 border-0 font-2 text-lg outline-none w-full bg-light-bg  text-text-grey font-bold lg:text-lg"
      />
    </div>
    <AnimatePresence>
      {error ? (
        <div className="relative h-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            className="font-2 font-bold text-error-red text-shadow-lg text-shadow-black/30 z-10 absolute"
          >
            {error}
          </motion.p>
        </div>
      ) : (
        ""
      )}
    </AnimatePresence>

    <div className="h-0.5 w-full bg-light-bg/50 my-2"></div>
  </div>
);

type formData = {
  userName: string;
  partnerName: string;
  userSalary: string;
  partnerSalary: string;
  errorUserName: string | null;
  errorPartnerName: string | null;
  errorUserSalary: string | null;
  errorPartnerSalary: string | null;
};

type userData = {
  userName: string;
  userSalary: string;
  partnerName: string;
  partnerSalary: string;
};

function FormPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<formData>({
    userName: "",
    partnerName: "",
    userSalary: "",
    partnerSalary: "",
    errorUserName: null,
    errorPartnerName: null,
    errorUserSalary: null,
    errorPartnerSalary: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      try {
        const parsed: userData = JSON.parse(storedUserData);

        setForm((prev) => ({
          ...prev,
          userName: parsed.userName || "",
          userSalary: parsed.userSalary || "",
          partnerName: parsed.partnerName || "",
          partnerSalary: parsed.partnerSalary || "",
          // mantenemos los errores como estaban
          errorUserName: null,
          errorUserSalary: null,
          errorPartnerName: null,
          errorPartnerSalary: null,
        }));
      } catch (err) {
        console.error("Error parsing localStorage userData:", err);
      }
    }
  }, []);

  return (
    <div className="h-full w-full p-0 lg:max-w-200 lg:max-h-9/12 lg:mt-8">
      <div className="h-full w-full bg-white/20 rounded-2xl p-8 lg:p-6 text-light-font flex flex-col justify-around">
        <InputDiv
          inputName="name"
          value={form.userName}
          placeholder={t("form.userNamePlaceHolder")}
          text={t("form.userNameLabel")}
          type="string"
          error={form.errorUserName}
          setValue={(val) => setForm({ ...form, userName: val })}
        />
        <InputDiv
          inputName="user-1-salary"
          value={form.userSalary}
          placeholder="1400..."
          text={t("form.userSalaryLabel")}
          type="number"
          error={form.errorUserSalary}
          setValue={(val) => setForm({ ...form, userSalary: val })}
        />
        <InputDiv
          inputName="name2"
          value={form.partnerName}
          placeholder={t("form.partnerNamePlaceHolder")}
          text={t("form.partnerNameLabel")}
          type="string"
          error={form.errorPartnerName}
          setValue={(val) => setForm({ ...form, partnerName: val })}
        />
        <InputDiv
          inputName="user-2-salary"
          value={form.partnerSalary}
          placeholder="1200..."
          text={t("form.partnerSalaryLabel")}
          type="number"
          error={form.errorPartnerSalary}
          setValue={(val) => setForm({ ...form, partnerSalary: val })}
        />
        <Link
          to={"/sharedExpenses"}
          className="bg-light-blue flex items-center justify-between px-4 py-4 rounded-lg text-white w-full mt-auto text-2xl max-w-80 shadow-sm shadow-black/40 hover:shadow-md duration-200 cursor-pointer hover:brightness-120 transition-all"
          onClick={(e) => {
            e.preventDefault();

            setForm((prev) => ({
              ...prev,
              errorUserName: null,
              errorUserSalary: null,
              errorPartnerName: null,
              errorPartnerSalary: null,
            }));

            let errors: {
              errorUserName: string | null;
              errorUserSalary: string | null;
              errorPartnerName: string | null;
              errorPartnerSalary: string | null;
            } = {
              errorUserName: null,
              errorUserSalary: null,
              errorPartnerName: null,
              errorPartnerSalary: null,
            };

            let hasError = false;

            if (!form.userName.trim()) {
              errors.errorUserName = t("form.errorUserName");
              hasError = true;
            }
            if (!form.userSalary.trim()) {
              errors.errorUserSalary = t("form.errorUserSalary");
              hasError = true;
            }
            if (parseInt(form.userSalary) <= 0) {
              errors.errorUserSalary = "mayor a 0";
              hasError = true;
            }
            if (!form.partnerName.trim()) {
              errors.errorPartnerName = t("form.errorPartnerName");
              hasError = true;
            }
            if (!form.partnerSalary.trim()) {
              errors.errorPartnerSalary = t("form.errorPartnerSalary");
              hasError = true;
            }
            if (parseInt(form.partnerSalary) <= 0) {
              errors.errorPartnerSalary = "mayor a 0";
              hasError = true;
            }

            // 🔑 una sola actualización de estado
            setForm((prev) => ({
              ...prev,
              ...errors,
            }));

            if (!hasError) {
              const userData: userData = {
                userName: form.userName,
                userSalary: form.userSalary,
                partnerName: form.partnerName,
                partnerSalary: form.partnerSalary,
              };

              localStorage.setItem("userData", JSON.stringify(userData));
              navigate("/sharedExpenses");
            }
          }}
        >
          <Trans i18nKey="form.buttonText"></Trans>
          <PlayIcon className="" />
        </Link>
      </div>
    </div>
  );
}

export default FormPage;
