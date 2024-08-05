import { createQueryOption } from '../createQueryKeyHelper';

const a = createQueryOption({
  apiUrl: (pathVariables: string) => '/terms/sign-up',
  queryFn: (apiUrl: string) => Promise.resolve(),
});

const b = createQueryOption({
  apiUrl: () => '/terms/sign-up',
  queryFn: (apiUrl: string) => Promise.resolve(),
});

const c = createQueryOption({
  apiUrl: () => '/terms/sign-up',
  queryFn: (apiUrl: string, payload: { id: number }) => Promise.resolve(),
});

const d = createQueryOption({
  apiUrl: (pathVariables: string) => '/terms/sign-up',
  queryFn: (apiUrl: string, payload: { id: number }) => Promise.resolve(),
});

a('a');

b();

c({ id: 1 });

d({ id: 1 }, 'pathVariables');
