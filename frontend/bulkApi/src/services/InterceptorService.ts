import { AuthVM } from "../models/AuthVM";

export class InterceptorService {

    static getAuthHeader(): Headers | undefined {
        try {
            const authVM: AuthVM = JSON.parse(localStorage.getItem("authVM") as string);
            let jwt: string = authVM.jwt;
            let header = new Headers();
            header.append("Authorization", `Bearer ${jwt}`);
            header.append("Content-Type", "application/json");
           
            return header;
        } catch (error) {
            console.log(error);
        }
    }

    static getJWT(): string {
        if (!localStorage.getItem("authVM") ) {
           return "";
        }
        const authVM: AuthVM = JSON.parse(localStorage.getItem("authVM") as string);
        let jwt: string = authVM.jwt;
        return `Bearer ${jwt}`;
    }
}