import { WarpDrive } from "./WarpDrive";

describe("WarpDrive", () => {
  test(`returns "A: 100 mg/s, B: 100 mg/s, C: 100 mg/s" at Infinite runtime`, () => {
    const warpDrive = new WarpDrive();

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("A: 100 mg/s, B: 100 mg/s, C: 100 mg/s");
    expect(warpDrive.calculateRunTime()).toBe("Infinite");
  });

  test(`returns "A: 90 mg/s, B: 90 mg/s, C: 90 mg/s" at Infinite runtime`, () => {
    const warpDrive = new WarpDrive({ speedOfLightPercent: "90%" });

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("A: 90 mg/s, B: 90 mg/s, C: 90 mg/s");
    expect(warpDrive.calculateRunTime()).toBe("Infinite");
  });

  test(`returns "A: 30 mg/s, B: 30 mg/s, C: 30 mg/s" at Infinite runtime`, () => {
    const warpDrive = new WarpDrive({ speedOfLightPercent: "30%" });

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("A: 30 mg/s, B: 30 mg/s, C: 30 mg/s");
    expect(warpDrive.calculateRunTime()).toBe("Infinite");
  });

  test(`returns "A: 90 mg/s, B: 100 mg/s, C: 110 mg/s" at 90 minutes runtime`, () => {
    const warpDrive = new WarpDrive({ injectorADamagePercent: "20%", injectorBDamagePercent: "10%" });

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("A: 90 mg/s, B: 100 mg/s, C: 110 mg/s");
    expect(warpDrive.calculateRunTime()).toBe("90 minutes");
  });

  test(`returns "A: 120 mg/s, B: 120 mg/s, C: 0 mg/s" at 80 minutes runtime`, () => {
    const warpDrive = new WarpDrive({ injectorCDamagePercent: "100%", speedOfLightPercent: "80%" });

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("A: 120 mg/s, B: 120 mg/s, C: 0 mg/s");
    expect(warpDrive.calculateRunTime()).toBe("80 minutes");
  });

  test(`returns "A: 150 mg/s, B: 150 mg/s, C: 150 mg/s" at 50 minutes runtime`, () => {
    const warpDrive = new WarpDrive({ speedOfLightPercent: "150%" });

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("A: 150 mg/s, B: 150 mg/s, C: 150 mg/s");
    expect(warpDrive.calculateRunTime()).toBe("50 minutes");
  });

  test(`returns "A: 150 mg/s, B: 150 mg/s, C: 120 mg/s" at 50 minutes runtime`, () => {
    const warpDrive = new WarpDrive({ injectorCDamagePercent: "30%", speedOfLightPercent: "140%" });

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("A: 150 mg/s, B: 150 mg/s, C: 120 mg/s");
    expect(warpDrive.calculateRunTime()).toBe("50 minutes");
  });

  test(`returns Unable to comply and 0 minutes of runtime`, () => {
    const warpDrive = new WarpDrive({
      injectorADamagePercent: "20%",
      injectorBDamagePercent: "50%",
      injectorCDamagePercent: "40%",
      speedOfLightPercent: "170%",
    });

    expect(warpDrive.calculateOptimalOperatingFlow()).toBe("Unable to comply");
    expect(warpDrive.calculateRunTime()).toBe("0 minutes");
  });
});
