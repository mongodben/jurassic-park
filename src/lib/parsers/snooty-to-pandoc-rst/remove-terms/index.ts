// like: :term:`text blah blah <text>`, where <text> is optional
const TERM = /:term:`(.*)(<.*>)?`/g;

function removeTerms(input: string): string {
  const inputTermsRemoved = input.replaceAll(
    TERM,
    (_match: string, term: string) => {
      return term;
    },
  );
  return inputTermsRemoved;
}

export default removeTerms;
