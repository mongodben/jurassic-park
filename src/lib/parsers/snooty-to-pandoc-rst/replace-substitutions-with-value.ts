const SUBSTITUTION_LIKE = /\|[^\s]+\|/g;

function replaceSubstitutions(input: string, subs: dictionary): string {
  const regex = SUBSTITUTION_LIKE;
  const res = input.replaceAll(regex, (match: string) => {
    const sub = match.slice(1, match.length - 1);
    const newVal = subs[sub];
    return newVal;
  });
  return res;
}

export default replaceSubstitutions;
