import { reporter } from 'vfile-reporter';
import { remark } from 'remark';
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide';

async function main(): Promise<void> {
  const res = await remark()
    .use(remarkPresetLintMarkdownStyleGuide)
    .process('*emphasis* and _importance_');
  console.log(String(res));
  console.log('derp', reporter(res));
  // .then((file) => {
  //   console.log(String(file));
  //   console.error(reporter(file));
  // });
}

export default main;
