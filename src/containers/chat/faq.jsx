import { AiOutlineClose } from "react-icons/ai";

export const Faq = ({ onOpenFaqs }) => {
  return (
    <div className="flex flex-col w-3/12 space-y-2  py-4 -mt-4 pr-2 bg-white">
     <div className="flex flex-row">
        <h3 className="flex-1 text-center m-0">FAQs</h3>
        <div className="flex-1 flex justify-end">
          <AiOutlineClose
            className="self-end text-xs cursor-pointer"
            onClick={onOpenFaqs}
          />
        </div>
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
