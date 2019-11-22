interface ServerResp {
    status: number;
    message: string;
    token?: string;
    success: boolean;
    data?: any;
    dataType?: string;
}
