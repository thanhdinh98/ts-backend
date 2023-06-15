import Validator, { ValidationError } from "fastest-validator";
import { Response } from "express";
import comerr from "../../../../../common/comerr";
import errors from "../../../../../common/comerr/errors";

const validator = new Validator();

function LoadRequestBody<T>(reqBody: any, validateSchema: any): T | Error {
  const check = validator.compile(validateSchema);
  const result = check(reqBody);
  switch (typeof result) {
    case "boolean":
      break;
    default: {
      const typedResult = <ValidationError[]>result;
      return comerr
        .WrapMessage(errors.ErrorDataInvalid
          .Wrap(JSON.stringify(typedResult)), "validate request failed");
    }
  }
  return <T>JSON.parse(JSON.stringify(reqBody));
}

function SendJSON<T>(res: Response, resModel: T) {
  res.status(200);
  res.json(resModel);
}

export default {
  LoadRequestBody,
  SendJSON,
};
