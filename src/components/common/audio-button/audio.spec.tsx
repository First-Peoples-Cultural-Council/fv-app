import { render } from "@testing-library/react";

import AudioButton from "./audio";

describe("AudioButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <AudioButton fvAudio={{
        speaker: null,
        filename: ""
      }} />
    );
    expect(baseElement).toBeTruthy();
  });
});
