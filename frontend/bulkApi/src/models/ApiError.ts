export class ApiError extends Error {
    name: string = "";
    path: string = "";
    message: string = "";
    stackTrace: string = "";
    innerException: string = "";
}