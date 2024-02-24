import {UserType} from "@/enums/UserType";

export class Page {
    private readonly _link: string;
    private readonly _name: string;
    private readonly _path: string;
    private readonly _type: UserType;

    constructor(link: string, name: string, path: string, type: UserType) {
        this._link = link;
        this._name = name;
        this._path = path;
        this._type = type;
    }

    get link(): string {
        return this._link;
    }

    get name(): string {
        return this._name;
    }

    get path(): string {
        return this._path;
    }

    public canAccess(type: UserType): boolean {
        return type == this._type;
    }
}
