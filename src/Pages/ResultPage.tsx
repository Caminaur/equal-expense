// import { useTranslation } from "react-i18next";
import WordCloud from "../Components/Graphs/word-cloud/WordCloud";

function ResultPage() {
  // const { t } = useTranslation();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center overflow-visible">
      <WordCloud></WordCloud>
    </div>
  );
}

export default ResultPage;
