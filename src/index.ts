/* eslint-disable */
export class Game {
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  private createRockQuestion(index: number): string {
    return "Rock Question " + index;
  }

  public add(name: string): boolean {
    this.players.push(name);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(name + " was added");
    console.log(`Player ${this.players[this.currentPlayer]} - ` + this.players.length);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(`Player ${this.players[this.currentPlayer]} - is the current player`);
    console.log(`Player ${this.players[this.currentPlayer]} - ` + "They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`Player ${this.players[this.currentPlayer]} - ` + ` is in penalty box after roll`);

      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(`Player ${this.players[this.currentPlayer]} - ` + " is getting out of the penalty box");
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
          console.log(`Player ${this.players[this.currentPlayer]} - ` + ` has return to case départ`);

          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        console.log(
          `Player ${this.players[this.currentPlayer]} - ` + "'s new location is " + this.places[this.currentPlayer]
        );
        console.log(`Player ${this.players[this.currentPlayer]} - ` + "The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(`Player ${this.players[this.currentPlayer]} - ` + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if (this.places[this.currentPlayer] > 11) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }

      console.log(
        `Player ${this.players[this.currentPlayer]} - ` + "'s new location is " + this.places[this.currentPlayer]
      );
      console.log(`Player ${this.players[this.currentPlayer]} - ` + "The category is " + this.currentCategory());
      this.askQuestion();
    }
  }

  private askQuestion(): void {
    if (this.currentCategory() == "Pop")
      console.log(`Player ${this.players[this.currentPlayer]} - was asked ${this.popQuestions.shift()}`);
    if (this.currentCategory() == "Science")
      console.log(`Player ${this.players[this.currentPlayer]} - was asked ${this.scienceQuestions.shift()}`);
    if (this.currentCategory() == "Sports")
      console.log(`Player ${this.players[this.currentPlayer]} - was asked ${this.sportsQuestions.shift()}`);
    if (this.currentCategory() == "Rock")
      console.log(`Player ${this.players[this.currentPlayer]} - was asked ${this.rockQuestions.shift()}`);
  }

  private currentCategory(): string {
    if (this.places[this.currentPlayer] == 0) return "Pop";
    if (this.places[this.currentPlayer] == 4) return "Pop";
    if (this.places[this.currentPlayer] == 8) return "Pop";
    if (this.places[this.currentPlayer] == 1) return "Science";
    if (this.places[this.currentPlayer] == 5) return "Science";
    if (this.places[this.currentPlayer] == 9) return "Science";
    if (this.places[this.currentPlayer] == 2) return "Sports";
    if (this.places[this.currentPlayer] == 6) return "Sports";
    if (this.places[this.currentPlayer] == 10) return "Sports";
    return "Rock";
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6);
  }

  public wrongAnswer(): boolean {
    console.log(`Player ${this.players[this.currentPlayer]} - ` + "Question was incorrectly answered");
    console.log(`Player ${this.players[this.currentPlayer]} - ` + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    console.log(`Player ${this.players[this.currentPlayer]} - ` + "Answer was correct!!!!");

    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`Player ${this.players[this.currentPlayer]} - is in penalty box`);

      if (this.isGettingOutOfPenaltyBox) {
        console.log(`Player ${this.players[this.currentPlayer]} - ` + "is getting out of penalty box");

        this.purses[this.currentPlayer] += 1;
        console.log(
          `Player ${this.players[this.currentPlayer]} - ` +
            " now has " +
            this.purses[this.currentPlayer] +
            " Gold Coins."
        );

        var winner = this.didPlayerWin();
        console.log(`Player ${this.players[this.currentPlayer]} - winner value: ${winner}`);

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

        return winner;
      } else {
        console.log(`Player ${this.players[this.currentPlayer]} - ` + "is not getting out of penalty box");

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      console.log(
        `Player ${this.players[this.currentPlayer]} - Answer was correct!!!! current player : ${
          this.players[this.currentPlayer]
        }`
      );

      this.purses[this.currentPlayer] += 1;
      console.log(
        `Player ${this.players[this.currentPlayer]} - ` + " now has " + this.purses[this.currentPlayer] + " Gold Coins."
      );

      var winner = this.didPlayerWin();

      console.log(`Player ${this.players[this.currentPlayer]} -  winner value: ${winner}`);

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    }
  }
}
