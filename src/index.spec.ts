import runGoldenMaster from "jest-golden-master";
import { Game } from ".";

test("My first scenario", async () => {
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
