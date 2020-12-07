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
        let connectiontype: "localhost" | "azure" = "localhost";
        const localhost: string = "https://localhost:44397/api/";
        const azure: string = "https://bulkapi20201108130318.azurewebsites.net/api/";

        if (connectiontype === "localhost") {
            return localhost;
        } else if (connectiontype === "azure") {
            return azure;
        } 

        throw new Error("connectionType does not match");
    }
}