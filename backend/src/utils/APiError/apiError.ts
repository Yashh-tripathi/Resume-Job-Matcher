class ApiError extends Error{
    public statusCode: number;
    public errors: string[];
    public data: null;
    public success: boolean;
    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode,
        this.message = message,
        this.errors = errors,
        this.data = null,
        this.success = false;

        if(stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export default ApiError