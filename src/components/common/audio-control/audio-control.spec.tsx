import { render } from "@testing-library/react";

import AudioControl from "./audio-control";

describe("AudioControl", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <AudioControl audio={{
        acknowledgement: "",
        description: "",
        excludeFromGames: false,
        excludeFromKids: false,
        id: "",
        isShared: false,
        original: {
          mimetype: "",
          path: ""
        },
        speakers: [],
        title: "",
        url: ""
      }}  />
    );
    expect(baseElement).toBeTruthy();
  });
});
