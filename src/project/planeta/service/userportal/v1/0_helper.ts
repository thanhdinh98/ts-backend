import Validator from "fastest-validator";
import { ValidationError } from "sequelize";

const validator = new Validator();

function LoadRequestBody<T>(body: any, validateSchema: any): T {
  const check = validator.compile(validateSchema);
  const result = check(body);
}

export default {
  LoadRequestBody,
};
