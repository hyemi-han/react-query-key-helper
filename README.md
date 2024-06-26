<h1 align="center">react query key helper</h1>

<p><strong>Query key management for @tanstack/query with auto-create features.</strong></p>

## Installing

For the latest stable version:

```bash
npm install react-query-key-helper
```

## Usage

```js
createQueryOption<Payload, PathVariables, Response> => ((
  payload: Payload,
  pathVariables?: PathVariables
) => QueryKeyHelperReturn<Response>
```

- post method

```js
createQueryOption({
  apiUrl: () => "/todos/search",
  queryFn: (apiUrl, payload: TeamSearchRequestT) =>
    request.post < PagedTeamsResponseT > (apiUrl, payload),
});
```

- get method

```js
createQueryOption<undefined, { id: string }>({
  apiUrl: ({ id }) => `/todo/${id}`,
  queryFn: (apiUrl) => request.get < TeamResponseT > apiUrl,
});
```
