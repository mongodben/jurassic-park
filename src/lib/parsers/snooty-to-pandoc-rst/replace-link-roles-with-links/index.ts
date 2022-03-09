const LINK_ROLE_LIKE = /:([^\s]+):`(.*)<(.*)>`/g; // like: :smthn:`text blah blah <text-no-spaces>`

function replaceRoles(input: string, roles: dictionary) {
  const res = input.replaceAll(
    LINK_ROLE_LIKE,
    (_match, linkRole, linkText, relativeUrl) => {
      if (!roles[linkRole]) {
        return `\`${linkText} _NO_MATCH_FOR_'${linkRole}'_ <${relativeUrl}>\`_`;
      }
      const baseUrl = roles[linkRole];
      const fullUrl = baseUrl.replace('%s', relativeUrl);
      return `\`${linkText} <${fullUrl}>\`_`;
    },
  );
  return res;
}

export default replaceRoles;
