import {Page} from "@/model/Page";
import {RouteRecordRaw} from "vue-router";
import {UserType} from "@/enums/UserType";

export class Pages {
    public static readonly TEST: Page = new Page("/test", "测试页面", "TestPage",
        UserType.TEST
    );
    public static readonly PAGES: Page[] = [
        Pages.TEST
    ];

    public static genRouter(type: UserType): RouteRecordRaw[] {
        let raw: RouteRecordRaw[] = []
        for (let page of Pages.PAGES) {
            if (!page.canAccess(type) || page.path.length == 0) continue;
            raw.push({
                path: page.link,
                name: page.name,
                component: () => import(`../views/${page.path}.vue`),
            })
        }
        return raw;
    }

    public static getPermissionPages(type: UserType): Page[] {
        let pages: Page[] = [];
        for (let page of Pages.PAGES) {
            if (!page.canAccess(type)) continue;
            if (page.path.length == 0) continue;
            pages.push(page)
        }
        return pages;
    }
}
