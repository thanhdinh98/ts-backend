import { Request, Response, NextFunction } from "express";
import { OurError } from "../../../common/comerr/meta";
import errors from "../../../common/comerr/errors";
import comutils from "../../../common/comutils";

type ErrorResponse = {
  code: string
  data: {
    error_code: string
    message: string
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ErrorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  const ourErr = <OurError>err;
  let isOurError = true;
  const defaultError: ErrorResponse = {
    code: "error",
    data: {
      error_code: errors.ErrorServerUnknown.code,
      message: "unknown error",
    },
  };
  res.status(200);

  if (!ourErr || !ourErr.isError) {
    isOurError = false;
  }
  if (isOurError) {
    if (comutils.IsSameError(ourErr, errors.ErrorDataInvalid)) {
      defaultError.data = {
        error_code: errors.ErrorDataInvalid.code,
        message: ourErr.String(),
      };
    }
  }
  res.json(defaultError);
}

export default {
  ErrorHandler,
};
