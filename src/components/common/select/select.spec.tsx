import { render } from "@testing-library/react";

import Select from "./select";

describe("Select", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Select
        options={[]}
        onChange={function (value: {
          target: { type: string; name: string; id: string; value: string };
        }): void {
          throw new Error("Function not implemented.");
        }}
        selected={""}
        name={""}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
