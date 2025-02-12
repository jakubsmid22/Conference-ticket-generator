import { useAtom } from "jotai";
import ticketDataAtom from "../data/ticketDataAtom";
import TicketContainer from "./TicketContainer";

const Ticket = () => {
  const [ticketData] = useAtom(ticketDataAtom);

  return (
    <div className="flex w-full max-w-[600px] flex-col items-center  gap-20 px-2 text-center font-bold">
      <div className="space-y-10">
        <h1 className="text-4xl">
          Congrats, <span className="text-gradient">{ticketData.name}</span>!
          Your ticket is ready.
        </h1>

        <p className="text-xl text-neutral-300">
          We've emailed your ticket to{" "}
          <span className="text-orange-500">{ticketData.email}</span> and will
          send updates in the run up to the event.
        </p>
      </div>

      <TicketContainer/>

    </div>
  );
};

export default Ticket;
