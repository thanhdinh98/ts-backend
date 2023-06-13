export type OurError = {
  isError: boolean
  message: string
  name: string
  err: Error,

  data?: {
    [key: string]: any
  }

  WithFields: (data: { [key: string]:any })=>OurError
  String: ()=> string
  Stack: ()=>string
};

export type OurErrorCode = {
  code: string

  Wrap: (err: Error | string)=>OurError
};
