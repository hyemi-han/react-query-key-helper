import { QueryKey } from "@tanstack/react-query";
import { isNonNil } from "./utils";

interface QueryKeyHelperProps<PathVariables, Payload, Response> {
  apiUrl: (pathVariables: PathVariables) => string;
  queryFn: (apiUrl: string, payload: Payload) => Promise<Response>;
}

interface QueryKeyHelperReturn<Response> {
  queryFn: () => Promise<Response>;
  queryKey: QueryKey;
}

export const createQueryOption =
  <Payload = unknown, PathVariables = unknown, Response = unknown>(
    props: QueryKeyHelperProps<PathVariables, Payload, Response>
  ): ((
    payload: Payload,
    pathVariables?: PathVariables
  ) => QueryKeyHelperReturn<Response>) =>
  (payload, pathVariables) => {
    const apiUrl = props.apiUrl(pathVariables as PathVariables);

    return {
      queryFn: () => {
        return props.queryFn(apiUrl, payload);
      },
      queryKey: [apiUrl.split("/"), payload, pathVariables].filter(
        isNonNil
      ) as QueryKey,
    };
  };
