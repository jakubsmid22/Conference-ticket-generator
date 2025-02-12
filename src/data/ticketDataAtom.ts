import { atom } from "jotai";

interface ticketData {
  avatar: File | null;
  name: string;
  email: string;
  githubUsername: string;
}

const ticketDataAtom = atom<ticketData>({
  avatar: null,
  name: "",
  email: "",
  githubUsername: "",
});

export default ticketDataAtom;
