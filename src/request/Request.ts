import axios from "axios";
import {Operate} from "@/model/Util";
import {frontConfig} from "@/config";
import {goToLogin} from "@/router";

export class Request {
    public static baseURL: string = `${process.env.VUE_APP_API_URL}/api`; // "http://47.94.231.166:1001/api"
    public static uploadUrl: string = `${Request.baseURL}/upload/${frontConfig.app_type}`;
    public static instance = axios.create({
        baseURL: Request.baseURL,
        timeout: 15000
    })

    public static getBaseURL() {
        return Request.baseURL;
    }

    public static async post(link: string, data: object, callback: (response) => void, verify: boolean = true) {
        await Request.instance.post(link, data, this.defaultHandler())
            .then(res => Request.call(res.data, callback, verify))
            .catch(reason => Request.axiosError(reason))
    }

    public static async get(link: string, callback: (response) => void, verify: boolean = true) {
        await Request.instance.get(link, this.defaultHandler())
            .then(res => Request.call(res.data, callback, verify))
            .catch(reason => Request.axiosError(reason))
    }

    public static async put(link: string, data: object, callback: (response) => void, verify: boolean = true) {
        await Request.instance.put(link, data, this.defaultHandler())
            .then(res => Request.call(res.data, callback, verify))
            .catch(reason => Request.axiosError(reason))
    }

    public static async del(link: string, callback: (response) => void, verify: boolean = true) {
        await Request.instance.delete(link, this.defaultHandler())
            .then(res => Request.call(res.data, callback, verify))
            .catch(reason => Request.axiosError(reason))
    }

    private static async call(context, callback: (response) => void, verify: boolean) {
        if (verify) {
            if (context.code == 200) {
                callback(context);
            } else if (context.code == -2 || context.code == 401) {
                goToLogin();
            } else {
                Operate.error(context.msg);
            }
        } else {
            callback(context);
        }
    }

    public static async onSuccess(file, callback: (response) => void) {
        await Request.call(file, callback, true);
    }

    private static axiosError(reason) {
        Operate.error(reason.message);
    }

    public static defaultHandler(): { headers: { AuthToken: string, AuthUid: string } } {
        return {
            headers: {
                AuthToken: `${localStorage.getItem("token")}`,
                AuthUid: `${localStorage.getItem("uid")}`
            }
        }
    }
}
