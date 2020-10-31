export enum Claims {
    PRODUCER = "PRODUCER",
    CONSUMER = "CONSUMER",
}


export class AuthVM {
    jwt: string = "";
    isAuthenticated: boolean = false;
    id: string = "";
    userName: string = "";
    email: string = "";
    claims: string[] = []

    constructor(userName="") {
        this.userName = userName;
    }
}
