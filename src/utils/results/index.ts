export class BaseResult {
    constructor(public hasError: boolean, public message?: string){}
}

export class BaseDataResult {
    constructor(public hasError: boolean, public message?: string, public data?: any){}
}

export class SuccessResult extends BaseResult{
    constructor(message?: string){
        super(false, message);
    }
}

export class ErrorResult extends BaseResult{
    constructor(message: string){
        super(true, message);
    }
}

export class SuccessDataResult extends BaseDataResult{
    constructor(message?: string, data?: any){
        super(false, message, data);
    }
}

export class ErrorDataResult extends BaseDataResult{
    constructor(message?: string, data?: any){
        super(true, message, data);
    }
}