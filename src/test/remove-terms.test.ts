import removeTerms from '../lib/parsers/snooty-to-pandoc-rst/remove-terms.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
const sampleData = fs.readFileSync(path.join('samples', 'terms.rst'), {
  encoding: 'utf8',
  flag: 'r',
});

it('Removes terms', () => {
  const res = removeTerms(sampleData);
  const resArr = res
    .trim()
    .split('\n')
    .map((s) => s.trim());
  const expectedArr = ['{+sync+}', 'data source', '{+app+}s', 'value'];

  resArr.forEach((res, i) => {
    expect(res).to.equal(expectedArr[i]);
  });
});
