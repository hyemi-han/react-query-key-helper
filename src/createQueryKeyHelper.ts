import { QueryKey } from '@tanstack/react-query';
import { isNonNil } from './utils';

interface QueryKeyHelperProps<Response, Payload, PathVariables> {
  apiUrl: (pathVariables: PathVariables) => string;
  queryFn: (apiUrl: string, payload: Payload) => Promise<Response>;
}

interface QueryKeyHelperNoPathVariablesProps<Response, Payload> {
  apiUrl: () => string;
  queryFn: (apiUrl: string, payload: Payload) => Promise<Response>;
}

interface QueryKeyHelperNoPayloadProps<Response, PathVariables> {
  apiUrl: (pathVariables: PathVariables) => string;
  queryFn: (apiUrl: string) => Promise<Response>;
}

interface QueryKeyHelperNoPayloadPathVariablesProps<Response> {
  apiUrl: () => string;
  queryFn: (apiUrl: string) => Promise<Response>;
}

interface QueryKeyHelperReturn<Response> {
  queryFn: () => Promise<Response>;
  queryKey: QueryKey;
}

export function createQueryOption<Response = unknown>(
  props: QueryKeyHelperNoPayloadPathVariablesProps<Response>
): () => QueryKeyHelperReturn<Response>;

export function createQueryOption<Response = unknown, PathVariables = unknown>(
  props: QueryKeyHelperNoPayloadProps<Response, PathVariables>
): (pathVariables: PathVariables) => QueryKeyHelperReturn<Response>;

export function createQueryOption<Response = unknown, Payload = unknown>(
  props: QueryKeyHelperNoPathVariablesProps<Response, Payload>
): (payload: Payload) => QueryKeyHelperReturn<Response>;

export function createQueryOption<
  Response = unknown,
  Payload = unknown,
  PathVariables = unknown
>(
  props: QueryKeyHelperProps<Response, Payload, PathVariables>
): (
  payload: Payload,
  pathVariables: PathVariables
) => QueryKeyHelperReturn<Response>;

export function createQueryOption<
  Response = unknown,
  Payload = unknown,
  PathVariables = unknown
>(props: QueryKeyHelperProps<Response, Payload, PathVariables>) {
  return (
    payload: Payload,
    pathVariables: PathVariables
  ): QueryKeyHelperReturn<Response> => {
    const apiUrl = props.apiUrl(pathVariables as PathVariables);

    return {
      queryFn: () => {
        return props.queryFn(apiUrl, payload);
      },
      queryKey: [
        apiUrl.split('/').filter((value) => value !== ''),
        payload,
        pathVariables,
      ].filter(isNonNil) as QueryKey,
    };
  };
}
