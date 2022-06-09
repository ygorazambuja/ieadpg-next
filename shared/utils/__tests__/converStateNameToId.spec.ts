import { converStateNameToId } from "../convertStateNameToId";

describe("converStateNameToId", () => {
  it("shloud convert state correcly", () => {
    const stateName = "São Paulo";
    const expected = 35;

    const result = converStateNameToId(stateName);

    expect(result).toBe(expected);
  });
});
