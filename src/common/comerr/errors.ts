import { OurErrorCode } from "./meta";
import { NewOurErrorCode } from "./manager";

export type ErrorServerUnknownCode = OurErrorCode;
export type ErrorIPBannedCode = OurErrorCode;
export type ErrorTooManyRequestCode = OurErrorCode;
export type ErrorDataInvalidCode = OurErrorCode;
export type ErrorDataNotFoundCode = OurErrorCode;
export type ErrorLockAcquiredCode = OurErrorCode;

const ErrorServerUnknown: ErrorServerUnknownCode = NewOurErrorCode("error_server_unknown");
const ErrorIPBanned: ErrorIPBannedCode = NewOurErrorCode("error_ip_banned");
const ErrorTooManyRequest: ErrorTooManyRequestCode = NewOurErrorCode("error_too_many_request");
const ErrorDataInvalid: ErrorDataInvalidCode = NewOurErrorCode("error_data_invalid");
const ErrorDataNotFound: ErrorDataNotFoundCode = NewOurErrorCode("error_data_not_found");
const ErrorLockAcquired: ErrorLockAcquiredCode = NewOurErrorCode("error_lock_acquired");

export default {
  ErrorDataInvalid,
  ErrorIPBanned,
  ErrorServerUnknown,
  ErrorTooManyRequest,
  ErrorDataNotFound,
  ErrorLockAcquired,
};
