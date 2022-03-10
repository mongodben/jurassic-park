const REF = /:ref:`([^<]*)(<([^<]*)>)?`/g;

interface warning {
  warnIfMatches: RegExp;
  warningInclusion: string;
}

function convertRefsToLinks(
  input: string,
  baseUrl: string,
  refs: refs,
  warning?: warning,
): string {
  const inputRefsConvertedToLinks = input.replaceAll(
    REF,
    (_match: string, linkText: string, _: string, ref?: string): string => {
      console.log({ linkText, ref });
      let href = 'ADD_LINK_HERE';
      if (ref && refs[ref]) {
        href = baseUrl + refs[ref].relativeUrl;
      }
      if (warning && warning.warnIfMatches.test(href)) {
        href += `__${warning.warningInclusion}__`;
      }
      return `\`${linkText}<${href}>\`_`;
    },
  );
  return inputRefsConvertedToLinks;
}

export default convertRefsToLinks;
