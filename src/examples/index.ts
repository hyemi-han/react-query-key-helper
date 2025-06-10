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

const e = createQueryOption({
  apiUrl: () => `/terms/sign-up`,
  queryFn: (apiUrl: string, payload?: { id?: number }) =>
    Promise.resolve({ apiUrl, payload }),
});
const f = createQueryOption({
  apiUrl: (pathVariables: string) => `/terms/sign-up/${pathVariables}`,
  queryFn: (apiUrl: string, payload?: { id?: number }) =>
    Promise.resolve({ apiUrl, payload }),
});

a({ pathVariables: 'a' });

b();

c({ payload: { id: 1 } });

d({ payload: { id: 1 }, pathVariables: 'pathVariables' });

e();
e({ payload: {} });
e({ payload: { id: 1 } });

f({ pathVariables: 'abc' });
f({ pathVariables: 'abc', payload: {} });
f({ pathVariables: 'abc', payload: { id: 1 } });
