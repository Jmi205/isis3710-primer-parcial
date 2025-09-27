import react from 'react';
import {useTranslations} from 'next-intl';


const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#11463B] h-full">
      <div className="flex flex-row justify-between items-center p-4 text-white w-full max-w-6xl mx-auto">
        <p>{t("rights")}</p>
        <p>{t("develop")}</p>
      </div>
    </footer>
  );
};

export default Footer;