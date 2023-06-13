import { OurError, OurErrorCode } from "../comerr/meta";

function IsUndefined(value: any | undefined): boolean {
  return typeof value === "undefined";
}

function IsError(val: any | Error): boolean {
  const err = <OurError>val;
  if (!err || !err.isError) {
    return false;
  }
  return true;
}

function IsSameError<TargetError extends OurErrorCode>(err: Error, targetErr: TargetError): boolean {
  let typedError = <OurError>err;
  for (;;) {
    if (!typedError || !typedError.isError) {
      return false;
    }
    if (typedError.message === targetErr.code) {
      return true;
    }
    typedError = <OurError>typedError.err;
  }
}

export default {
  IsUndefined,
  IsError,
  IsSameError,
};
