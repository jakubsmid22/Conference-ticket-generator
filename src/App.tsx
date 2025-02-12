import { useAtom } from "jotai";
import Background from "./components/Background";
import Form from "./components/Form";
import ticketDataAtom from "./data/ticketDataAtom";
import Ticket from "./components/Ticket";

const App = () => {
  const [ticketData] = useAtom(ticketDataAtom);

  const isFormComplete =
    ticketData.avatar !== null &&
    ticketData.name.trim() !== "" &&
    ticketData.email.trim() !== "" &&
    ticketData.githubUsername.trim() !== "";

  return (
    <div className="text-neutral-0 font-inconsolata relative flex min-h-screen flex-col items-center gap-10 overflow-hidden scroll-smooth px-2 pt-10">
      <Background />
      {isFormComplete ? <Ticket /> : <Form />}
    </div>
  );
};

export default App;
