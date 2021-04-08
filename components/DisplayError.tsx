type Props = {
  error: any;
};

export default function DisplayError({ error }: Props) {
  if (!error || !error.message) return null;
  const hasNetworkError =
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length;

  const graphQLErrors =
    error.graphQLErrors &&
    error.graphQLErrors.length &&
    error.graphQLErrors[0].extensions;

  if (hasNetworkError) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>
        <p data-test='graphql-error'>
          <strong>Shoot! </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }

  if (graphQLErrors) {
    return error.graphQLErrors.map((err) => {
      if (err.extensions.exception) {
        const { data } = err.extensions.exception.data;

        return data.map((ext) => {
          return ext.messages.map((err, i) => (
            <div key={i}>
              <p data-test='graphql-error'>
                <strong>Shoot! </strong>
                {err.message}
              </p>
            </div>
          ));
        });
      }
    });
  }

  return (
    <div>
      <p data-test='graphql-error'>
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  );
}

DisplayError.defaultProps = {
  error: {},
};
