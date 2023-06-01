import { render } from "@testing-library/react";

import TextInput from "./text-input";
import { ChangeEvent } from "react";

describe("TextInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <TextInput
        id={""}
        value={""}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
        label={""}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
