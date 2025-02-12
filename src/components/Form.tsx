import { useAtom } from "jotai";
import AvatarInput from "./AvatarInput";
import ticketDataAtom from "../data/ticketDataAtom";
import { AvatarPreview } from "./AvatarPreview";
import { useState } from "react";
import InfoIcon from "./InfoIcon";

interface ValidationErrors {
  avatar: string | null;
  name: string | null;
  email: string | null;
  githubUsername: string | null;
}

const Form = () => {
  const [ticketData, setTicketData] = useAtom(ticketDataAtom);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    avatar: null,
    name: null,
    email: null,
    githubUsername: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleGithubUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    if (value && value[0] !== "@") {
      value = "@" + value;
    }

    setGithubUsername(value);
  };

  const generateTicket = (e: React.FormEvent) => {
    e.preventDefault();

    setValidationErrors({
      avatar: null,
      name: null,
      email: null,
      githubUsername: null,
    });

    if (!ticketData.avatar) {
      setValidationErrors((prevData) => ({
        ...prevData,
        avatar: "Please upload a photo.",
      }));
    }

    if (!name) {
      setValidationErrors((prevData) => ({
        ...prevData,
        name: "Please enter a name.",
      }));
    }

    if (!emailRegex.test(email)) {
      setValidationErrors((prevData) => ({
        ...prevData,
        email: "Please enter a valid email adress.",
      }));
    }

    if (!githubUsername) {
      setValidationErrors((prevData) => ({
        ...prevData,
        githubUsername: "Please enter a GitHub username.",
      }));
    } else if (githubUsername[0] !== "@") {
      setGithubUsername("@" + githubUsername);
    }

    setTicketData((prevData) => ({ ...prevData, name, email, githubUsername }));
  };

  return (
    <div className="z-50 flex w-full max-w-[700px] flex-col items-center gap-5 px-10">
      <h1 className="text-center text-4xl">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <p className="text-center text-xl text-neutral-300">
        Secure your spot at next year's biggest coding conference.
      </p>

      <form onSubmit={generateTicket} className="w-full space-y-4 md:w-[80%]">
        <div className="flex flex-col gap-2">
          <label className="text-xl" htmlFor="avatar">
            Upload Avatar
          </label>
          {ticketData.avatar ? (
            <AvatarPreview />
          ) : (
            <AvatarInput validationError={validationErrors.avatar} />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl" htmlFor="avatar">
            Full Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="bg-neutral-0/15 hover:bg-neutral-0/25 cursor-pointer rounded-xl border-2 border-neutral-500 p-3 transition-colors duration-300"
          />
          {validationErrors.name && (
            <div className="flex gap-2 text-orange-700">
              <InfoIcon />
              <p>{validationErrors.name}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl" htmlFor="avatar">
            Email Adress
          </label>
          <input
            type="text"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-0/15 hover:bg-neutral-0/25 cursor-pointer rounded-xl border-2 border-neutral-500 p-3 transition-colors duration-300"
          />
          {validationErrors.email && (
            <div className="flex gap-2 text-orange-700">
              <InfoIcon />
              <p>{validationErrors.email}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl" htmlFor="avatar">
            GitHub Username
          </label>
          <input
            type="text"
            placeholder="@yourusername"
            onChange={handleGithubUsernameChange}
            value={githubUsername}
            className="bg-neutral-0/15 hover:bg-neutral-0/25 cursor-pointer rounded-xl border-2 border-neutral-500 p-3 transition-colors duration-300"
          />
          {validationErrors.githubUsername && (
            <div className="flex gap-2 text-orange-700">
              <InfoIcon />
              <p>{validationErrors.githubUsername}</p>
            </div>
          )}
        </div>
        <input
          value="Generate My Ticket"
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-orange-500 py-2 text-2xl font-extrabold text-neutral-900 transition-colors duration-300 hover:bg-orange-700"
        />
      </form>
    </div>
  );
};

export default Form;
