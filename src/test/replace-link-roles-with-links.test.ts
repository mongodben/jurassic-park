import replaceRolesWithLinks from '../lib/parsers/snooty-to-pandoc-rst/replace-link-roles-with-links.js';
import { expect } from 'chai';

const linksMap = {
  wikipedia: 'https://en.wikipedia.org/wiki/%s',
};

const input1 = `:wikipedia:\`realm <realm>\``;
const input2 = `:wikipedia:\`realm
<realm>\``;

it('replaces link roles with standard RST links', () => {
  const res1 = replaceRolesWithLinks(input1, linksMap);
  const res2 = replaceRolesWithLinks(input2, linksMap);

  const expected1 = '`realm <https://en.wikipedia.org/wiki/realm>`_';
  const expected2 = '`realm\n<https://en.wikipedia.org/wiki/realm>`_';
  expect(res1).to.eql(expected1);
  expect(res2).to.eql(expected2);
});
