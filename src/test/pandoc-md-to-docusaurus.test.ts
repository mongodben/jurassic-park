import { expect } from 'chai';
import converter from '../lib/parsers/pandoc-md-to-docusaurus-mdx/pandoc-md-admonitions-to-docusaurus.js';

it('heres nuthin', async () => {
  await converter();
  expect(true).to.be.true;
});
