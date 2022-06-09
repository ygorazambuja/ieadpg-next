import { BRAZILIAN_STATES } from "../constants";

export const converStateNameToId = (stateName: string): number => {
  const state = BRAZILIAN_STATES.find((state) => state.nome === stateName);

  if (!state) {
    throw new Error(`State ${stateName} not found`);
  }

  return state.id;
};
