import { getRequest } from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/cfg/menu").then(data => {
        if (data) {
            //  格式化Router
            let fmtRoutes = formatRoutes(data);
            // 添加到路由
            for (let x of fmtRoutes) {
                router.addRoute(x)
            }
            //将数据存入vuex
            store.commit('initRoutes', fmtRoutes);
            store.dispatch('connect');
        }
    })
}

//  routes是从后端接收过来的data数据
export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(item => {
        let {
            path,
            component,
            name,
            iconCls,
            children
        } = item;
        if (children && children instanceof Array) {
            // 递归
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                if (component.startsWith('Home')) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith('Emp')) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith('Per')) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sal')) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sta')) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sys')) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        fmtRoutes.push(fmRouter)
    });
    return fmtRoutes;
}