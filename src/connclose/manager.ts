type CloseFn = ()=> void;

const closers: CloseFn[] = [];

export function RegisterCloser(fn: CloseFn) {
  closers.push(fn);
}

export function CloseConnections() {
  closers.forEach((closeFn) => {
    closeFn();
  });
}
