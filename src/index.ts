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

  private moveCurrentPlayer(numberOfSpots: number) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + numberOfSpots;

    if (this.places[this.currentPlayer] > 11) {
      console.log(`Player ${this.players[this.currentPlayer]} - ` + ` has return to case départ`);

      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
    }

    console.log(
      `Player ${this.players[this.currentPlayer]} - ` + "'s new location is " + this.places[this.currentPlayer]
    );
  }

  public roll(roll: number) {
    console.log(`Player ${this.players[this.currentPlayer]} - is the current player`);
    console.log(`Player ${this.players[this.currentPlayer]} - ` + "They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`Player ${this.players[this.currentPlayer]} - ` + ` is in penalty box after roll`);

      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(`Player ${this.players[this.currentPlayer]} - ` + " is getting out of the penalty box");

        this.moveCurrentPlayer(roll);

        console.log(`Player ${this.players[this.currentPlayer]} - ` + "The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(`Player ${this.players[this.currentPlayer]} - ` + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.moveCurrentPlayer(roll);

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
    const CATEGORY_POSITIONNING = {
      0: "Pop",
      1: "Science",
      2: "Sports",
      3: "Rock",
    };

    const currentCategoryPositionning = this.places[this.currentPlayer] % 4;

    return CATEGORY_POSITIONNING[currentCategoryPositionning];
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6);
  }

  private switchPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
  }

  public wrongAnswer(): boolean {
    console.log(`Player ${this.players[this.currentPlayer]} - ` + "Question was incorrectly answered");
    console.log(`Player ${this.players[this.currentPlayer]} - ` + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.switchPlayer();

    return true;
  }

  private creditGoldCoinToCurrentPlayer() {
    this.purses[this.currentPlayer] += 1;
    console.log(
      `Player ${this.players[this.currentPlayer]} - ` + " now has " + this.purses[this.currentPlayer] + " Gold Coins."
    );
  }

  public wasCorrectlyAnswered(): boolean {
    console.log(`Player ${this.players[this.currentPlayer]} - ` + "Answer was correct!!!!");

    if (this.inPenaltyBox[this.currentPlayer]) {
      console.log(`Player ${this.players[this.currentPlayer]} - is in penalty box`);

      if (this.isGettingOutOfPenaltyBox) {
        console.log(`Player ${this.players[this.currentPlayer]} - ` + "is getting out of penalty box");

        this.creditGoldCoinToCurrentPlayer();

        var winner = this.didPlayerWin();
        console.log(`Player ${this.players[this.currentPlayer]} - winner value: ${winner}`);

        this.switchPlayer();

        return winner;
      } else {
        console.log(`Player ${this.players[this.currentPlayer]} - ` + "is not getting out of penalty box");

        this.switchPlayer();

        return true;
      }
    } else {
      console.log(
        `Player ${this.players[this.currentPlayer]} - Answer was correct!!!! current player : ${
          this.players[this.currentPlayer]
        }`
      );

      this.creditGoldCoinToCurrentPlayer();

      var winner = this.didPlayerWin();

      console.log(`Player ${this.players[this.currentPlayer]} -  winner value: ${winner}`);

      this.switchPlayer();

      return winner;
    }
  }
}
