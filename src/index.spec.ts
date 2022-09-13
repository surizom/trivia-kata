import runGoldenMaster from "jest-golden-master";
import { Game } from ".";

describe("My first scenario", () => {
  test("only correct answers", () => {
    runGoldenMaster("only correct answers", async () => {
      const game = new Game();

      game.add("Guy");
      game.add("Marcel");

      game.roll(2);
      game.wasCorrectlyAnswered();

      game.roll(5);
      game.wasCorrectlyAnswered();

      game.roll(1);
      game.wasCorrectlyAnswered();

      game.roll(4);
      game.wasCorrectlyAnswered();

      game.roll(6);
      game.wasCorrectlyAnswered();

      game.roll(2);
      game.wasCorrectlyAnswered();
    });
  });

  test("only wrong answers", () => {
    runGoldenMaster("only wrong answers", async () => {
      const game = new Game();

      game.add("Guy");
      game.add("Marcel");

      game.roll(1);
      game.wrongAnswer();

      game.roll(2);
      game.wrongAnswer();

      game.roll(1);
      game.wrongAnswer();

      game.roll(2);
      game.wrongAnswer();

      game.roll(1);
      game.wrongAnswer();

      game.roll(2);
      game.wrongAnswer();
    });
  });

  test("mix of right & wrong answers and full board walk", () => {
    runGoldenMaster("mix of right & wrong answers and full board walk", async () => {
      const game = new Game();

      game.add("Guy");
      game.add("Marcel");

      game.roll(5);
      game.wasCorrectlyAnswered();
      game.roll(6);
      game.wrongAnswer();

      game.roll(4);
      game.wrongAnswer();
      game.roll(7);
      game.wasCorrectlyAnswered();

      game.roll(3);
      game.wasCorrectlyAnswered();
      game.roll(7);
      game.wrongAnswer();

      game.roll(4);
      game.wasCorrectlyAnswered();
      game.roll(5);
      game.wasCorrectlyAnswered();

      game.roll(3);
      game.wasCorrectlyAnswered();
      game.roll(3);
      game.wasCorrectlyAnswered();

      game.roll(3);
      game.wasCorrectlyAnswered();
      game.roll(9);
      game.wasCorrectlyAnswered();
    });
  });

  test("only right answers and full board walk", () => {
    runGoldenMaster("only right answers and full board walk", async () => {
      const game = new Game();

      game.add("Guy");
      game.add("Marcel");

      game.roll(5);
      game.wasCorrectlyAnswered();
      game.roll(6);
      game.wasCorrectlyAnswered();

      game.roll(4);
      game.wasCorrectlyAnswered();
      game.roll(7);
      game.wasCorrectlyAnswered();

      game.roll(3);
      game.wasCorrectlyAnswered();
      game.roll(7);
      game.wasCorrectlyAnswered();

      game.roll(4);
      game.wasCorrectlyAnswered();
      game.roll(5);
      game.wasCorrectlyAnswered();

      game.roll(3);
      game.wasCorrectlyAnswered();
      game.roll(3);
      game.wasCorrectlyAnswered();

      game.roll(3);
      game.wasCorrectlyAnswered();
      game.roll(8);
      game.wasCorrectlyAnswered();
    });
  });

  test("getting in and out of the penalty box", () => {
    runGoldenMaster("getting in and out of the penalty box", async () => {
      const game = new Game();

      game.add("Guy");
      game.add("Marcel");

      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(1);
      game.wrongAnswer();

      game.roll(1);
      game.wasCorrectlyAnswered();
      game.roll(2);
      game.wasCorrectlyAnswered();
    });
  });
});
