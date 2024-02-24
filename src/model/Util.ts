import {ElMessage} from "element-plus";

export class Operate {
    public static error(msg): void {
        ElMessage.error(`操作失败：${msg}`);
    }

    public static success(): void {
        ElMessage.success('操作成功');
    }

    public static msg(msg: string): void {
        ElMessage.success(msg);
    }
}

export class Data {
    public static copy(input: any): any {
        if (input instanceof Array) return Data.copyArray(input);
        let out: any = {};
        for (let name of Object.getOwnPropertyNames(input)) {
            let data = input[name];
            if (data instanceof Array) {
                out[name] = Data.copyArray(data);
            } else if (data instanceof Object) {
                out[name] = Data.copy(data);
            }
            else out[name] = data;
        }
        return out;
    }

    public static copyArray(input: object): any {
        let out: any[] = []
        if (input instanceof Array) {
            for (let i = 0; i < input.length; i++) {
                out[i] = input[i];
            }
        }
        return out
    }
}
