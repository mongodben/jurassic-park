const INCLUDE = /\.\. (include):: .*/g;

// this is done to block the pandoc behavior of trying to replace includes, and if it fails
// to instead output nothing.
function replaceIncludesWithFakeDirective(input: string, replacement: string) {
  return input.replaceAll(INCLUDE, (_match: string, includeKeyword: string) => {
    return _match.replace(includeKeyword, replacement);
  });
}

export default replaceIncludesWithFakeDirective;
