import fs from 'fs';
import Yaml from 'yamljs';
import path from 'path';

interface yamlFileJson {
  title: string;
  content: string;
}

function convertYamlStepFileToSnooty(
  yamlStepFileInput: string,
  headerUnderlineChar = '-',
) {
  const splitRegex = /\n---[\n]+/;
  const yamlStrSteps = yamlStepFileInput.split(splitRegex);
  const jsonSteps = yamlStrSteps.map((step: string) => {
    return Yaml.parse(step);
  });
  const pureRstSteps = jsonSteps.map((step: yamlFileJson, i) => {
    const stepNum = i + 1;
    const title = stepNum.toString() + '. ' + step.title;
    const titleUnderline = new Array(title.length)
      .fill(headerUnderlineChar)
      .join('');
    return `
${title}
${titleUnderline}

${step.content}`.trim();
  });
  return pureRstSteps.join('\n\n');
}

function addStepYamlAsRst(input: string, pathToStepFilesDir: string) {
  const STEP_FILE_INCLUDE = /\.\. include:: \/includes\/steps\/(.*)\.rst/g;

  const rstWithSteps = input.replaceAll(
    STEP_FILE_INCLUDE,
    (_, rstFileNameNoExtension) => {
      const yamlFileName = 'steps-' + rstFileNameNoExtension + '.yaml';
      const yamlFilePath = path.join(pathToStepFilesDir, yamlFileName);
      const yamlFileContent = fs.readFileSync(yamlFilePath, {
        encoding: 'utf8',
        flag: 'r',
      });
      const stepFileAsString = convertYamlStepFileToSnooty(
        yamlFileContent,
        '~',
      );
      return stepFileAsString;
    },
  );
  return rstWithSteps;
}

export default addStepYamlAsRst;
