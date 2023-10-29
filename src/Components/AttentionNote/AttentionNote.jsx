import { HiOutlineLightningBolt } from "react-icons/hi";

const AttentionNote = () => {
  return (
    <div className="">
      <div className="flex items-center space-x-1">
        <div className="rounded-full bg-tertiaryBlue flex items-center justify-center w-5 h-5">
          <HiOutlineLightningBolt />
        </div>
        <h1 className="font-bold text-md">Attention</h1>
      </div>
      <div className="py-2 2xl:py-4 text-xs lg:text-sm">
        <p className="text-textgray">
          L’utilisation de cet outil est à but démonstration. Pour plus
          d’informations support@synapp-messaging.com
        </p>
        <p className="text-textgray">
          Conditions générales d’utilisation. Notre politique de confidentialité
          de données.
        </p>
      </div>
    </div>
  );
};

export default AttentionNote;
