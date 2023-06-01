import { render } from "@testing-library/react";

import SearchHeader from "./search-header";

describe("SearchHeader", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <SearchHeader
        title={""}
        backgroundColors={{
          to: "",
          from: "",
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
