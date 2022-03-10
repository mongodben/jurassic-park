import convertRefsToLinks from '../lib/parsers/snooty-to-pandoc-rst/refs-to-links.js';
import { expect } from 'chai';

const refs = {
  'dotnet-client-reset': {
    id: 'std-label-dotnet-client-reset',
    relativeUrl:
      '/realm/sdk/dotnet/advanced-guides/client-reset#std-label-dotnet-client-reset',
  },
  'baas-service': {
    id: 'std-label-dotnet-client-reset',
    relativeUrl: '/realm/cloud/service/',
  },
};
const input1 = `Learn how to perform a :ref:\`Client Reset using the .NET SDK <dotnet-client-reset>\`.`;
const input2 = `Learn how to perform a :ref:\`Client Reset using the .NET SDK
<dotnet-client-reset>\`.`;
const input3 = `:ref:\`Something BaaS <baas-service>\`.`;
const input4 = `:ref:\`No ref exists <not-real-ref>\`.`;
it('removes refs and replaces w links', () => {
  const res1 = convertRefsToLinks(input1, 'https://docs.mongodb.com', refs, {
    warnIfMatches: /\/sdk\//,
    warningInclusion: 'REPLACE_WITH_RELATIVE_LINK',
  });
  const res2 = convertRefsToLinks(input2, 'https://docs.mongodb.com', refs, {
    warnIfMatches: /\/sdk\//,
    warningInclusion: 'REPLACE_WITH_RELATIVE_LINK',
  });
  const res3 = convertRefsToLinks(input3, 'https://docs.mongodb.com', refs, {
    warnIfMatches: /\/sdk\//,
    warningInclusion: 'REPLACE_WITH_RELATIVE_LINK',
  });
  const res4 = convertRefsToLinks(input4, 'https://docs.mongodb.com', refs, {
    warnIfMatches: /\/sdk\//,
    warningInclusion: 'REPLACE_WITH_RELATIVE_LINK',
  });

  const expected1 = `Learn how to perform a \`Client Reset using the .NET SDK <https://docs.mongodb.com/realm/sdk/dotnet/advanced-guides/client-reset#std-label-dotnet-client-reset__REPLACE_WITH_RELATIVE_LINK__>\`_.`;
  expect(res1).to.equal(expected1);
  const expected2 = `Learn how to perform a \`Client Reset using the .NET SDK
<https://docs.mongodb.com/realm/sdk/dotnet/advanced-guides/client-reset#std-label-dotnet-client-reset__REPLACE_WITH_RELATIVE_LINK__>\`_.`;
  expect(res2).to.equal(expected2);
  const expected3 =
    '`Something BaaS <https://docs.mongodb.com/realm/cloud/service/>`_.';
  expect(res3).to.equal(expected3);
  const expected4 = '`No ref exists <ADD_LINK_HERE>`_.';
  expect(res4).to.equal(expected4);
});
