import { MAX_INJECTOR_CAPACITY, SPEED_OF_LIGHT_FLOW } from "./constants";
import { Injectors, WarpDriveProps } from "./types";
import { getPercentageNumber } from "./utils";

export class WarpDrive {
  speedOfLightPercent: WarpDriveProps["speedOfLightPercent"];
  injectorADamagePercent: WarpDriveProps["injectorADamagePercent"];
  injectorBDamagePercent: WarpDriveProps["injectorBDamagePercent"];
  injectorCDamagePercent: WarpDriveProps["injectorCDamagePercent"];
  injectors: Injectors;
  speedOfLightFlow: number;
  #extraFlowRequiredPerInjector: number;
  #injectorKeys: Array<keyof typeof this.injectors>;

  constructor({
    speedOfLightPercent,
    injectorADamagePercent,
    injectorBDamagePercent,
    injectorCDamagePercent,
  }: WarpDriveProps = {}) {
    this.speedOfLightPercent = speedOfLightPercent ?? "100%";
    this.injectorADamagePercent = injectorADamagePercent ?? "0%";
    this.injectorBDamagePercent = injectorBDamagePercent ?? "0%";
    this.injectorCDamagePercent = injectorCDamagePercent ?? "0%";

    this.speedOfLightFlow = SPEED_OF_LIGHT_FLOW * (getPercentageNumber(this.speedOfLightPercent) / 100);

    this.injectors = {
      A: MAX_INJECTOR_CAPACITY - getPercentageNumber(this.injectorADamagePercent),
      B: MAX_INJECTOR_CAPACITY - getPercentageNumber(this.injectorBDamagePercent),
      C: MAX_INJECTOR_CAPACITY - getPercentageNumber(this.injectorCDamagePercent),
    };

    this.#injectorKeys = Object.keys(this.injectors) as Array<keyof typeof this.injectors>;
    const injectorsTotalCapacity = this.#injectorKeys.reduce((acc, injector) => acc + this.injectors[injector], 0);

    const extraFlowRequiredToReachSpeedOfLight = this.speedOfLightFlow - injectorsTotalCapacity;
    const workingInjectors = this.#injectorKeys.filter((key) => this.injectors[key] > 0);

    this.#extraFlowRequiredPerInjector = extraFlowRequiredToReachSpeedOfLight / workingInjectors.length;
  }

  calculateOptimalOperatingFlow() {
    if (this.#extraFlowRequiredPerInjector > 99) {
      return "Unable to comply";
    }

    return this.#injectorKeys
      .map((injector) => {
        const injectorCapacity = this.injectors[injector];
        return `${injector}: ${injectorCapacity > 0 ? injectorCapacity + this.#extraFlowRequiredPerInjector : 0} mg/s`;
      })
      .join(", ");
  }

  calculateRunTime() {
    if (this.#extraFlowRequiredPerInjector > 99) {
      return "0 minutes";
    }

    if (this.#extraFlowRequiredPerInjector <= 0) {
      return "Infinite";
    }

    return `${100 - this.#extraFlowRequiredPerInjector} minutes`;
  }
}
