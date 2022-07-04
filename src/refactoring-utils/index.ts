/* eslint-disable no-console */
import * as fs from "fs";

const DIRECTORY = "./src/master";

const createDirectoryIfRequired = (): void => {
  if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY);
  }
};

const generateFilePaths = (slug: string) => {
  return {
    master: `${DIRECTORY}/${slug}-master.txt`,
    actual: `${DIRECTORY}/${slug}-actual.txt`,
  };
};

type Scenario = () => void;

const runScenario = (filePath: string, scenario: Scenario): void => {
  const teardown = () => {
    console.log = console.log.bind(console);
  };

  console.log = (text: string): void => {
    // eslint-disable-next-line prefer-template
    fs.appendFileSync(filePath, text + "\n");
  };

  scenario();
  teardown();
};

const eraseFile = (path: string): void => {
  fs.writeFileSync(path, "");
};

const runGoldenMaster = (slug: string, scenario: Scenario): void => {
  createDirectoryIfRequired();

  const { master, actual } = generateFilePaths(slug);

  const createMaster = (): void => {
    runScenario(master, scenario);
  };

  const compareActualToMaster = (): void => {
    eraseFile(actual);
    runScenario(actual, scenario);
    expect(fs.readFileSync(actual)).toEqual(fs.readFileSync(master));
  };

  if (!fs.existsSync(master)) {
    createMaster();
  } else {
    compareActualToMaster();
  }
};

export default runGoldenMaster;
