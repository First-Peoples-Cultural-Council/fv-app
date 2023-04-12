import { render } from "@testing-library/react";

import RightSlider from "./right-slider";

describe("RightSlider", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <RightSlider
        isSliderOpen={false}
        onCloseSlider={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
