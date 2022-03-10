const LINK_ROLE_LIKE = /:(.*):`([^<`]*)(<(.*)>)?`/g;
// like: :smthn:`text blah blah <text-no-spaces>`
// or 2 lines:
// :smthn:`text blah blah
// <text-no-spaces>`

function replaceRoles(
  input: string,
  roles: dictionary,
  rolesToIgnore: string[] = ['ref', 'term'],
) {
  const res = input.replaceAll(
    LINK_ROLE_LIKE,
    (match, linkRole, linkText, _, relativeUrl) => {
      if (rolesToIgnore.includes(linkRole)) return match;
      if (!roles[linkRole]) {
        return `\`${linkText} _NO_MATCH_FOR_'${linkRole}'_ <${relativeUrl}>\`_`;
      }
      const baseUrl = roles[linkRole];
      const fullUrl = baseUrl.replace('%s', relativeUrl);
      return `\`${linkText}<${fullUrl}>\`_`;
    },
  );
  return res;
}

export default replaceRoles;
