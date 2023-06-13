import { OurError, OurErrorCode } from "./meta";

function NewOurError(err: Error, msg: string): OurError {
  return {
    isError: true,
    err,
    message: msg,
    name: "OurError",

    WithFields(data: { [key: string]: any }) {
      this.data = data;
      return this;
    },
    String() {
      return `${this.message} | ${this.err.message}`;
    },
    Stack() {
      let actualErr = this.err;
      for (;;) {
        if (!actualErr) {
          return "no stack";
        }
        if (actualErr.stack) {
          return actualErr.stack;
        }
        actualErr = (<OurError>actualErr).err;
      }
    },
  };
}

export function NewOurErrorCode(code: string): OurErrorCode {
  return {
    code,
    Wrap(err: Error | string) {
      return typeof err === "string"
        ? NewOurError(new Error(err), code)
        : NewOurError(err, code);
    },
  };
}

export function WrapMessage(err: Error, msg: string): OurError {
  const ourErr: OurError = NewOurError(err, msg);
  return ourErr;
}
