import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ticketDataAtom from "../data/ticketDataAtom";
import iconUpload from "../assets/images/icon-upload.svg";
import InfoIcon from "./InfoIcon";

const AvatarInput = ({
  validationError,
}: {
  validationError: string | null;
}) => {
  const [, setTicketData] = useAtom(ticketDataAtom);
  const [errorMsg, setError] = useState<string | null>(validationError);

  useEffect(() => {
    setError(validationError);
  }, [validationError]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > 500 * 1024) {
        setError("File too large. Please upload a photo under 500KB");
        return;
      }
      setTicketData((prevData) => ({ ...prevData, avatar: file }));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
  });

  return (
    <div className="space-y-2 text-neutral-300">
      <div
        {...getRootProps()}
        className="bg-neutral-0/15 hover:bg-neutral-0/25 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-neutral-500 py-4 text-center transition-colors duration-300"
      >
        <input {...getInputProps()} />

        <>
          <div className="rounded-xl border-2 border-neutral-700 bg-white/20 p-2">
            <img src={iconUpload} alt="icon-upload" className="w-8" />
          </div>
          <p className="text-xl">Drag and drop or click to upload</p>
        </>
      </div>
      <div className="flex gap-2">
        <InfoIcon />

        {errorMsg ? (
          <div className="text-orange-700">{errorMsg}</div>
        ) : (
          <div>Upload your photo (JPG or PNG, max size: 5MB).</div>
        )}
      </div>
    </div>
  );
};

export default AvatarInput;
