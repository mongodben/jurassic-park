const SOURCE_CONSTANT_LIKE = /{\+[^\s]+\+}/g; // like: {+TEXT_NO_SPACES+}

function replaceSourceConstants(
  input: string,
  sourceConstants: dictionary,
): string {
  const regex = SOURCE_CONSTANT_LIKE;
  const res = input.replaceAll(regex, (match: string) => {
    const sourceConstant = match.slice(2, match.length - 2);
    const newVal = sourceConstants[sourceConstant];
    return newVal;
  });
  return res;
}

export default replaceSourceConstants;
