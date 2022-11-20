import create from "zustand";
import { Member } from "../entities/member";

type MemberState = {
  birthdayMembers: Member[];
  // eslint-disable-next-line no-unused-vars
  setBirthdayMembers: (members: Member[]) => void;
};

export const useMembersStore = create<MemberState>((set) => ({
  birthdayMembers: [],
  setBirthdayMembers: (members: Member[]) => set({ birthdayMembers: members }),
}));
