import { render } from "@testing-library/react";

import SearchInput from "./search-input";
import { ChangeEvent } from "react";

describe("SearchInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <SearchInput
        value={""}
        onChange={function (value: ChangeEvent<any>): void {
          throw new Error("Function not implemented.");
        }}
        clickSearch={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
