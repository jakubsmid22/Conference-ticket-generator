import { useAtom } from "jotai";
import ticketDataAtom from "../data/ticketDataAtom";
import { useState } from "react";
import InfoIcon from "./InfoIcon";

export const AvatarPreview = () => {
  const [ticketData, setTicketData] = useAtom(ticketDataAtom);
  const [errorMsg, setError] = useState<string | null>(null);

  const removeAvatar = () => {
    setTicketData((prevData) => ({ ...prevData, avatar: null }));
  };

  interface ChangeAvatarEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const changeAvatar = (event: ChangeAvatarEvent): void => {
    setError(null);

    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload only JPG or PNG.");
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File too large. Please upload a photo under 500KB");
      return;
    }

    setTicketData((prevData) => ({ ...prevData, avatar: selectedFile }));
  };

  return (
    <div className="space-y-3 text-neutral-300">
      <div className="bg-neutral-0/15 flex flex-col items-center gap-5 rounded-xl border-2 border-dashed border-neutral-500 py-5 text-center transition-colors duration-300">
        <img
          className="h-20 w-20 rounded-2xl border-2 border-neutral-500"
          src={ticketData.avatar ? URL.createObjectURL(ticketData.avatar) : ""}
          alt="avatar-img"
        />
        <div className="space-x-5">
          <button
            onClick={removeAvatar}
            className="cursor-pointer rounded-md bg-neutral-700/70 p-2 underline"
          >
            Remove image
          </button>
          <label
            htmlFor="file-upload"
            className="inline-block cursor-pointer rounded-md bg-neutral-700/70 p-2 underline"
          >
            Change image
          </label>
          <input
            onChange={changeAvatar}
            id="file-upload"
            type="file"
            className="hidden"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <InfoIcon/>

        {errorMsg ? (
          <div className="text-orange-700">{errorMsg}</div>
        ) : (
          <div>Upload your photo (JPG or PNG, max size: 5MB).</div>
        )}
      </div>
    </div>
  );
};
