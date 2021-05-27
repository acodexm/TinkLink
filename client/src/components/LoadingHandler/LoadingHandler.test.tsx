import React from "react";

import { cleanup, render } from "../../helpers/RTL";
import LoadingHandler from "./LoadingHandler";

describe("test loading handler", () => {
  beforeAll(() => cleanup());
  test("Hide children until its safe to render", () => {
    const { queryByTestId, rerender } = render(
      <LoadingHandler error={false} loading={true} preventDisplayContent={true}>
        <div>anything</div>
      </LoadingHandler>,
    );
    const content = queryByTestId("content");

    expect(content).toBeTruthy();
    rerender(
      <LoadingHandler error={false} loading={false} preventDisplayContent={true}>
        <div>anything</div>
      </LoadingHandler>,
    );
    expect(content).toHaveStyle("visibility: visible");
  });
  test("Shows loading", () => {
    const { queryByTestId } = render(
      <LoadingHandler error={false} loading={true}>
        <div>anything</div>
      </LoadingHandler>,
    );
    const loading = queryByTestId("loading");
    const content = queryByTestId("content");
    const error = queryByTestId("error");

    expect(content).toHaveStyle("visibility: hidden");
    expect(loading).toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
  });
  test("Shows error", async () => {
    const { queryByTestId } = render(
      <LoadingHandler error={true} loading={false}>
        <div>anything</div>
      </LoadingHandler>,
    );
    const content = queryByTestId("content");
    const error = queryByTestId("error");
    const loading = queryByTestId("loading");

    expect(content).toHaveStyle("visibility: hidden");
    expect(loading).not.toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });
  test("Shows success", async () => {
    const { queryByTestId } = render(
      <LoadingHandler error={false} loading={false}>
        <div>anything</div>
      </LoadingHandler>,
    );
    const content = queryByTestId("content");
    const loading = queryByTestId("loading");
    const error = queryByTestId("error");

    expect(content).toHaveStyle("visibility: visible");
    expect(loading).not.toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
  });
});
