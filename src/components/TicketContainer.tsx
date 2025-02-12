import ticketPattern from "../assets/images/pattern-ticket.svg";
import logoMark from "../assets/images/logo-mark.svg";
import ticketDataAtom from "../data/ticketDataAtom";
import githubIcon from "../assets/images/icon-github.svg";
import { useAtom } from "jotai";
const TicketContainer = () => {
  const ticketNumber = Math.floor(1000 + Math.random() * 9000);
  const [ticketData] = useAtom(ticketDataAtom);

  return (
    <div className="relative flex h-[210px] w-[450px] items-center justify-between p-6 pr-0 sm:h-[280px] sm:w-[600px]">
      <img
        src={ticketPattern}
        alt="ticketPattern"
        className="absolute top-0 right-0 bottom-0 left-0"
        draggable={false}
      />
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-[40%] items-start gap-5">
          <img src={logoMark} alt="logo-img" className="sm:w-14" />
          <div className="flex flex-col items-start gap-2 sm:gap-4">
            <p className="text-3xl sm:text-4xl">Coding Conf</p>
            <p className="text-neutral-500 sm:text-lg">
              Jan 31, 2025 / Austin, TX
            </p>
          </div>
        </div>

        <div className="flex h-[40%] items-center gap-5">
          <a
            className="z-50"
            target="_blank"
            href={
              ticketData.avatar
                ? URL.createObjectURL(ticketData.avatar)
                : undefined
            }
          >
            <img
              src={
                ticketData.avatar ? URL.createObjectURL(ticketData.avatar) : ""
              }
              alt="avatar-img"
              className="h-16 w-16 rounded-md sm:h-20 sm:w-20"
            />
          </a>
          <div className="flex h-full flex-col items-start justify-between py-2">
            <p className="text-lg sm:text-3xl">{ticketData.name}</p>
            <a
              href={`https://github.com/${ticketData.githubUsername.substring(1)}`}
              target="_blank"
              className="z-50 flex gap-1 text-neutral-500"
            >
              <img src={githubIcon} alt="github-icon" />
              <p className="text-lg">{ticketData.githubUsername}</p>
            </a>
          </div>
        </div>
      </div>
      <div className="rotate-90 transform text-3xl text-neutral-500">
        #0{ticketNumber}
      </div>
    </div>
  );
};

export default TicketContainer;
