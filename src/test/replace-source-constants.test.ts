import replaceSourceConstantsWithValue from '@/parsers/snooty-to-pandoc-rst/replace-source-constants-with-value';
import { expect } from 'chai';

const sourceConstants = {
  realm: 'realm',
  realms: 'realms',
  'client-database': 'Realm Database',
  'client-db-short': 'Realm',
};

const input = `{+realm+}
{+realms+} are great
{+client-database+}'s data sync functionality`;

it('replaces source constants with their reference text', () => {
  const res = replaceSourceConstantsWithValue(input, sourceConstants);
  const resArr = res
    .trim()
    .split('\n')
    .map((s) => s.trim());
  const expectedArr = [
    'realm',
    'realms are great',
    "Realm Database's data sync functionality",
  ];
  expect(resArr).to.eql(expectedArr);
});
