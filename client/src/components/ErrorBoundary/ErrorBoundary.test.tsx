import React, { FC } from "react";

import { render } from "../../helpers/RTL";
import ErrorBoundary from "./ErrorBoundary";

const warning = "I'm dangerous";
const Bomb: FC<{ explode?: boolean }> = ({ explode }) => {
  if (explode) throw new Error("Boom");
  return <div>{warning}</div>;
};
const renderBomb = (explode?: boolean) =>
  render(
    <ErrorBoundary>
      <Bomb explode={explode} />
    </ErrorBoundary>,
  );
const mockLog = jest.fn();

describe("checks global error handler", () => {
  beforeAll(() => {
    console.error = mockLog;
  });
  it("catches error", () => {
    const { getByText } = renderBomb(true);

    expect(getByText("Error occurred :(")).toBeVisible();
    expect(mockLog).toBeCalled();
  });
  it("renders children", () => {
    const { getByText } = renderBomb();

    expect(getByText(warning)).toBeInTheDocument();
  });
});
