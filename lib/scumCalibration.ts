export function worldToPixel(x: number, y: number): [number, number] {
  const pixelX =
    -0.000727296988 * x +
    0.0000137481652 * y +
    713.815342;

 const pixelY =
  0.00000615692046 * x +
  -0.000701923502 * (-y) +
  560.10482;

  return [pixelY, pixelX];
}