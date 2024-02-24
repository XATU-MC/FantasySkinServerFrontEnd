import {Page} from "@/model/Page";
import {getUserType} from "@/enums/UserType";
import {Pages} from "@/enums/Pages";

export function getAvailablePages(): Page[] {
    let result: Page[] = []
    let userTypePages = Pages.getPermissionPages(getUserType());
    userTypePages.forEach(ep => {
        result.push(ep);
    });
    return result;
}
