import { QueryKey } from '@tanstack/react-query';
import { isNonNil } from './utils';

interface QueryKeyHelperProps<Response, Payload, PathVariables> {
  apiUrl: (pathVariables: PathVariables) => string;
  queryFn: (apiUrl: string, payload: Payload) => Promise<Response>;
}

interface QueryKeyOptionalPayloadHelperProps<Response, Payload, PathVariables> {
  apiUrl: (pathVariables: PathVariables) => string;
  queryFn: (apiUrl: string, payload?: Payload) => Promise<Response>;
}

interface QueryKeyHelperNoPathVariablesProps<Response, Payload> {
  apiUrl: () => string;
  queryFn: (apiUrl: string, payload: Payload) => Promise<Response>;
}

interface QueryKeyHelperNoPathVariablesOptionalPayloadProps<Response, Payload> {
  apiUrl: () => string;
  queryFn: (apiUrl: string, payload?: Payload) => Promise<Response>;
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

export function createQueryOption<Response = unknown, Payload = unknown>(
  props: QueryKeyHelperNoPathVariablesOptionalPayloadProps<Response, Payload>
): (params?: { payload?: Payload }) => QueryKeyHelperReturn<Response>;

export function createQueryOption<Response = unknown>(
  props: QueryKeyHelperNoPayloadPathVariablesProps<Response>
): () => QueryKeyHelperReturn<Response>;

export function createQueryOption<
  Response = unknown,
  Payload = unknown,
  PathVariables = unknown
>(
  props: QueryKeyOptionalPayloadHelperProps<Response, Payload, PathVariables>
): (params: {
  payload?: Payload;
  pathVariables: PathVariables;
}) => QueryKeyHelperReturn<Response>;

export function createQueryOption<Response = unknown, PathVariables = unknown>(
  props: QueryKeyHelperNoPayloadProps<Response, PathVariables>
): (params: { pathVariables: PathVariables }) => QueryKeyHelperReturn<Response>;

export function createQueryOption<Response = unknown, Payload = unknown>(
  props: QueryKeyHelperNoPathVariablesProps<Response, Payload>
): (params: { payload: Payload }) => QueryKeyHelperReturn<Response>;

export function createQueryOption<
  Response = unknown,
  Payload = unknown,
  PathVariables = unknown
>(
  props: QueryKeyHelperProps<Response, Payload, PathVariables>
): (params: {
  payload: Payload;
  pathVariables: PathVariables;
}) => QueryKeyHelperReturn<Response>;

export function createQueryOption<
  Response = unknown,
  Payload = unknown,
  PathVariables = unknown
>(props: QueryKeyHelperProps<Response, Payload, PathVariables>) {
  return (params?: {
    payload?: Payload;
    pathVariables?: PathVariables;
  }): QueryKeyHelperReturn<Response> => {
    const apiUrl = props.apiUrl(params?.pathVariables as PathVariables);

    return {
      queryFn: () => {
        return props.queryFn(apiUrl, params?.payload as Payload);
      },
      queryKey: [
        apiUrl.split('/').filter((value) => value !== ''),
        params?.payload,
        params?.pathVariables,
      ].filter(isNonNil) as QueryKey,
    };
  };
}
