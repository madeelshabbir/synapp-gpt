import { AiOutlineClose } from "react-icons/ai";

export const Faq = ({ onOpenFaqs }) => {
  return (
    <div className="flex flex-col w-4/12 space-y-2  py-0 -mt-0 pr-5">
      <div className="self-end">
      <AiOutlineClose
        className="self-end text-xs cursor-pointer"
        onClick={onOpenFaqs}
      />

      </div>
      <div className=" flex flex-col space-y-5  items-center bg-white px-4 py-8 overflow-y-auto">

        <div className="bg-textSenderBG text-sm font-semibold flex flex-col items-center justify-center w-full py-4 h-28  px-4 rounded-md ">
          Question ? <br /> answer FAQ
        </div>
        <div className="text-center bg-textSenderBG rounded-md py-4">
          Prompt 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus dictum lorem, quis convallis a rcu porttitor non. Nulla tempor dolor sit amet semper pharetra
        </div>
        <div className="text-center bg-textSenderBG rounded-md py-4">
          Prompt 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus dictum lorem, quis convallis a rcu porttitor non. Nulla tempor dolor sit amet semper pharetra
        </div>
        <div className="text-center bg-textSenderBG rounded-md py-4">
          Prompt 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus dictum lorem, quis convallis a rcu porttitor non. Nulla tempor dolor sit amet semper pharetra
        </div>
      </div>
    </div>
  );
};
