import { ApiError } from "./ApiError";
// To handle a collection of errors

export class ErrorCollection {
    errors: ApiError[] | Error[] | null = []
}