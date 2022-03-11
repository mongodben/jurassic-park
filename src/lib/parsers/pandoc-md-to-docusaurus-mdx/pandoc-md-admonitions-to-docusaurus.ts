import { fromMarkdown } from 'mdast-util-from-markdown';
import fs from 'fs';
import { frontmatter } from 'micromark-extension-frontmatter';
import {
  frontmatterFromMarkdown,
  frontmatterToMarkdown,
} from 'mdast-util-frontmatter';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm';
import { mdxjs } from 'micromark-extension-mdxjs';
import { mdxFromMarkdown, mdxToMarkdown } from 'mdast-util-mdx';
import { toMarkdown } from 'mdast-util-to-markdown';

const doc = `
import Burp from './Burp.js';


# Derppp

### Merp

:::note Meep

**bold**

hello world

:::

<NameOfInclude/>

<Burp id="swag"/>

<div class="not-an-include">

/name/of/include.rst

</div>
`;

async function main(): Promise<void> {
  const tree = fromMarkdown(doc, {
    extensions: [frontmatter(['yaml']), gfm(), mdxjs()],
    mdastExtensions: [
      frontmatterFromMarkdown(['yaml']),
      gfmFromMarkdown(),
      mdxFromMarkdown(),
    ],
  });
  // console.log(tree);

  fs.writeFileSync('treeout.json', JSON.stringify(tree, null, 2));

  traverseNodes(tree, tree);
  const docOut = toMarkdown(tree, {
    extensions: [
      frontmatterToMarkdown(['yaml']),
      gfmToMarkdown(),
      mdxToMarkdown(),
    ],
  });
  fs.writeFileSync('docout.md', docOut);
  // const res = await unified()
  //   .use(remarkParse)
  //   .use(remarkFrontmatter)
  //   .use(remarkGfm);
  // // .process('---\nlayout: home\n---\n\n# Hi ~~Mars~~Venus!');
  // console.log(String(res));
  // console.log('derp', reporter(res));
  // // .then((file) => {
  // //   console.log(String(file));
  // //   console.error(reporter(file));
  // // });
}

function traverseNodes(node, root) {
  createTitleFrontMatter(node);
  convertIncludesToMdx(node, root, 'not-an-include');
  if (!node.children) return;
  node.children.forEach((child) => traverseNodes(child, root));
}

function createTitleFrontMatter(node) {
  if (node.type === 'root') {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type === 'heading' && child.depth === 1) {
        const title = child.children[0].value;
        const titleYaml = `title: ${title}`;
        console.log(title);
        const firstNode = node.children[0];
        if (firstNode.type === 'yaml') {
          firstNode.value += '\n' + titleYaml;
          break;
        } else {
          node.children.unshift({
            type: 'yaml',
            value: titleYaml,
          });
          break;
        }
      }
    }
  }
}

function convertIncludesToMdx(node, root, className: string){
  if(node.cl)
}

export default main;
