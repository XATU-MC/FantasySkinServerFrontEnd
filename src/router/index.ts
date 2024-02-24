import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import {Pages} from "@/enums/Pages";
import {getUserType} from "@/enums/UserType";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: () =>
            import("../views/LoginPage.vue"),
        meta: {ignoreAuth: true}
    },
    {
        path: "/",
        name: "main",
        component: () =>
            import("../views/HomePage.vue"),
        children: Pages.genRouter(getUserType())
    },
];

const router: Router = createRouter({
    history: createWebHistory('/web'),
    routes,
});

router.beforeEach((to, _, next) => {
    if (to.meta.ignoreAuth || localStorage.getItem("token")) next();
    else next('/login')
})

export default router;

export function goToLogin() {
    localStorage.clear();
    sessionStorage.clear();
    refreshRouter()
    router.push({name: "Login"}).then(_ => undefined);
}

export function getUserTypeID(): number {
    return parseInt(localStorage.getItem("user_type_id")!);
}

export function refreshRouter() {
    // router.removeRoute("main");
    router.addRoute({
        path: "/",
        name: "main",
        component: () =>
            import("../views/HomePage.vue"),
        children: Pages.genRouter(getUserType())
    })
}
