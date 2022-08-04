type NonZeroDigits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Percent = `${NonZeroDigits}${NonZeroDigits | 0}%` | `${NonZeroDigits | 0}%` | `100%`;
export type UnlimitedPercent = `${number}%`;

export type WarpDriveProps = {
  injectorADamagePercent?: Percent;
  injectorBDamagePercent?: Percent;
  injectorCDamagePercent?: Percent;
  speedOfLightPercent?: UnlimitedPercent;
};

export type Injectors = {
  A: number;
  B: number;
  C: number;
};
