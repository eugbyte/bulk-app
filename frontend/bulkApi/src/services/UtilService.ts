import { AuthVM } from "../models/AuthVM";

export class UtilService {

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

    static getApiUrl(): string {
        const localhost: string = "http://localhost:44397/api/";   // http and not https
        // const azure: string = "https://bulkapi20201108130318.azurewebsites.net/api/";

        return localhost;
    }
}