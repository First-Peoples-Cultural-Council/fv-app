import { render } from "@testing-library/react";

import FvVideo from "./video";

describe("Video", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <FvVideo src={""} />
    );
    expect(baseElement).toBeTruthy();
  });
});
