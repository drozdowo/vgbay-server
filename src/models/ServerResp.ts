interface ServerResp {
  status: number;
  message: string;
  token?: string;
  data?: any;
  dataType?: string;
  success: boolean;
}
