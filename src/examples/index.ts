import { createQueryOption } from '../createQueryKeyHelper';

const a = createQueryOption({
  apiUrl: (pathVariables: string) => `/terms/sign-up?${pathVariables}`,
  queryFn: (apiUrl: string) => Promise.resolve(apiUrl),
});

const b = createQueryOption({
  apiUrl: () => '/terms/sign-up',
  queryFn: (apiUrl: string) => Promise.resolve(apiUrl),
});

const c = createQueryOption({
  apiUrl: () => '/terms/sign-up',
  queryFn: (apiUrl: string, payload: { id: number }) =>
    Promise.resolve({ apiUrl, payload }),
});

const d = createQueryOption({
  apiUrl: (pathVariables: string) => `/terms/sign-up?${pathVariables}`,
  queryFn: (apiUrl: string, payload: { id: number }) =>
    Promise.resolve({ apiUrl, payload }),
});

a('a');

b();

c({ id: 1 });

d({ id: 1 }, 'pathVariables');
