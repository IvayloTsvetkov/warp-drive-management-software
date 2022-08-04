import { WarpDrive } from "./WarpDrive";

const warpDrive = new WarpDrive({ speedOfLightPercent: "30%" });
console.log(warpDrive.calculateRunTime(), warpDrive.calculateOptimalOperatingFlow());
