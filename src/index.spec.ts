import runGoldenMaster from "jest-golden-master";

test("My first scenario", async () => {
  runGoldenMaster("my-first-scenario", async () => {
    // Write your scenario here and run the test.
    console.log("Something happens");
  });
});
