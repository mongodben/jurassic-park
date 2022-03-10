import addStepYamlAsRst from '../lib/parsers/giza-to-snooty/add-step-yaml-as-rst.js';
import convertRefsToLinks from '../lib/parsers/snooty-to-pandoc-rst/refs-to-links.js';
import removeTerms from '../lib/parsers/snooty-to-pandoc-rst/remove-terms.js';
import replaceIncludesWithFakeDirectives from '../lib/parsers/snooty-to-pandoc-rst/replace-includes-with-fake-directive.js';
import replaceRolesWithLinks from '../lib/parsers/snooty-to-pandoc-rst/replace-link-roles-with-links.js';
import replaceSourceConstantsWithValue from '../lib/parsers/snooty-to-pandoc-rst/replace-source-constants-with-value.js';
import replaceSubstitutionsWithValue from '../lib/parsers/snooty-to-pandoc-rst/replace-substitutions-with-value.js';
import pandocRstToMd from '../lib/parsers/pandoc-rst-to-md.js';
import fs from 'fs';
import path from 'path';

it('Test pipeline til .md out', async () => {
  const linkRoles = JSON.parse(
    fs.readFileSync('samples/link-roles.json', {
      encoding: 'utf8',
      flag: 'r',
    }),
  );
  const refs = JSON.parse(
    fs.readFileSync('samples/refs.json', {
      encoding: 'utf8',
      flag: 'r',
    }),
  );
  const sourceConstants = JSON.parse(
    fs.readFileSync('samples/source-constants.json', {
      encoding: 'utf8',
      flag: 'r',
    }),
  );
  const substitutions = JSON.parse(
    fs.readFileSync('samples/substitutions.json', {
      encoding: 'utf8',
      flag: 'r',
    }),
  );

  let testRstInput = fs.readFileSync(path.join('samples', 'input.txt'), {
    encoding: 'utf8',
    flag: 'r',
  });

  // giza to snooty
  testRstInput = addStepYamlAsRst(
    testRstInput,
    '/Users/ben.p/projects/docs-realm/source/includes',
  );
  // snooty to rst
  testRstInput = convertRefsToLinks(
    testRstInput,
    'https://docs.mongodb.com',
    refs,
    {
      warnIfMatches: /\/sdk\//,
      warningInclusion: '__MAKE_DOCUSAURUS_LINK__',
    },
  );
  testRstInput = removeTerms(testRstInput);
  testRstInput = replaceIncludesWithFakeDirectives(
    testRstInput,
    'not-an-include',
  );
  testRstInput = replaceRolesWithLinks(testRstInput, linkRoles);
  testRstInput = replaceSourceConstantsWithValue(testRstInput, sourceConstants);
  testRstInput = replaceSubstitutionsWithValue(testRstInput, substitutions);
  // console.log(testRstInput);
  const mdOut = await pandocRstToMd(testRstInput);
  // console.log(mdOut);
});
