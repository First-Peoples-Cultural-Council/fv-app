import { render } from "@testing-library/react";

import FvImage from "./image";

describe("Image", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <FvImage src={""} alt={""}/>
    );
    expect(baseElement).toBeTruthy();
  });
});
