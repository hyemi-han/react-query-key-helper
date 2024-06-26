
```js
createQueryOption<Payload, PathVariables, Response> => ((
  payload: Payload,
  pathVariables?: PathVariables
) => QueryKeyHelperReturn<Response>
```

## Usage

- post method
```js
createQueryOption({
  apiUrl: () => "/todos/search",
  queryFn: (apiUrl, payload: TeamSearchRequestT) =>
    request.post < PagedTeamsResponseT > (apiUrl, payload),
})
```

- get method

```js
createQueryOption<undefined, { id: string }>({
  apiUrl: ({ id }) => `/todo/${id}`,
  queryFn: apiUrl => request.get<TeamResponseT>(apiUrl),
})
```
