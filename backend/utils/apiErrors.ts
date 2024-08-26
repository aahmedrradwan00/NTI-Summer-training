class ApiErrors extends Error {
    private status: string;
    constructor(massage: string, private statusCode: number) {
        super(massage);
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
    }
}

export default ApiErrors;
