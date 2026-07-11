export function createServerFn(options: any = {}) {
  const fn: any = (args: any = {}) => {
    if (fn._handler) {
      // In the real createServerFn, the handler receives an object containing 'data'
      const handlerArgs = args && 'data' in args ? args : { data: args };
      return fn._handler(handlerArgs);
    }
    return Promise.resolve();
  };

  fn.validator = (v: any) => {
    fn._validator = v;
    return fn;
  };

  fn.handler = (h: any) => {
    fn._handler = h;
    return fn;
  };

  return fn;
}

export function createStart() {
  return {};
}

export function createMiddleware() {
  return {};
}

export default {
  createServerFn,
  createStart,
  createMiddleware,
};
