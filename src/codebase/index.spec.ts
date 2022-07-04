import runGoldenMaster from "../refactoring-utils";

test("My first scenario", () => {
  runGoldenMaster("my-first-scenario", () => {
    // Write your scenerio here and run the test.
    console.log("Something happens");
  });
});

test("My second scenario", () => {
  runGoldenMaster("my-second-scenario", () => {
    // Write your scenerio here and run the test.
    console.log("Something else happens");
  });
});
