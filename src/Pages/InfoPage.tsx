import { Link } from "react-router-dom";
import { PlayIcon } from "../assets/icons";
import { Trans, useTranslation } from "react-i18next";

function InfoPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full w-full p-6 md:p-8">
      <p className="font-2 text-lg pt-3 md:w-2/3 text-shadow-sm text-shadow-black/50 sm:pt-6">
        {t("info.description")}
      </p>
      {/* example */}
      <div className="bg-dark-bg/70 rounded-lg p-6 text-light-font font-2 text-lg my-6 shadow-lg shadow-dark-bg/30">
        <p>
          <Trans
            i18nKey="info.lisa"
            components={{ pink: <span className="text-example-pink" /> }}
          ></Trans>
          <span className="text-example-green">{t("info.lisaSalary")}</span>
        </p>
        <p>
          <Trans
            i18nKey="info.tom"
            components={{ blue: <span className="text-example-blue" /> }}
          ></Trans>
          <span className="text-example-green">{t("info.tomSalary")}</span>
        </p>
        <div className="my-4 md:my-10"></div>
        <p>
          <Trans
            i18nKey="info.expenses"
            components={{ red: <span className="text-example-red" /> }}
          />
        </p>
        <div className="my-4 sm:my-10"></div>
        <p>
          <Trans
            i18nKey="info.conclusion"
            components={{
              green: <span className="text-example-green"></span>,
              pink: <span className="text-example-pink"></span>,
            }}
          />
        </p>
        <Trans
          i18nKey="info.conclusion2"
          components={{
            ptag: <p />,
            blue: <span className="text-example-blue" />,
            green: <span className="text-example-green" />,
          }}
        />
      </div>
      <Link
        to={"/form"}
        className="bg-light-blue flex items-center justify-between px-4 py-4 rounded-lg text-white w-full mt-auto text-2xl max-w-80 shadow-sm shadow-black/40 hover:shadow-md duration-200 cursor-pointer hover:brightness-120 transition-all"
      >
        {t("info.buttonText")} <PlayIcon className="" />
      </Link>
    </div>
  );
}

export default InfoPage;
