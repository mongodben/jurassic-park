import addStepYamlAsRst from '@/parsers/giza-to-snooty/add-step-yaml-as-rst';
import convertRefsToLinks from '@/parsers/snooty-to-pandoc-rst/refs-to-links';
import removeTerms from '@/parsers/snooty-to-pandoc-rst/remove-terms';
import replaceIncludesWithFakeDirectives from '@/parsers/snooty-to-pandoc-rst/replace-includes-with-fake-directive';
import replaceRolesWithLinks from '@/parsers/snooty-to-pandoc-rst/replace-link-roles-with-links';
import replaceSourceConstantsWithValue from '@/parsers/snooty-to-pandoc-rst/replace-source-constants-with-value';
import replaceSubstitutionsWithValue from '@/parsers/snooty-to-pandoc-rst/replace-substitutions-with-value';
import pandocRstToMd from '@/parsers/pandoc-rst-to-md';
import linkRoles from '$/config/link-roles.json';
import refs from '$/config/refs.json';
import sourceConstants from '$/config/source-constants.json';
import substitutions from '$/config/substitutions.json';
import fs from 'fs';
import path from 'path';

it('Test pipeline til .md out', async () => {
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
