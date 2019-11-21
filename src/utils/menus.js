import {getRequest} from './api'

//初始化菜单方法
export const initMenu=(router,store)=>{
    if(store.state.routes.length>0){
        return ;
    }
    getRequest("/system/config/menu").then(data=>{
        if(data){
            let fmtRoutes=formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes',fmtRoutes);
        }
    })

}

export const formatRoutes=(routes)=>{
    let fmRoutes=[];
    routes.forEach(route=>{
        let{
            path,
            component,
            name,
            meta,
            iconCls,
            children
        }=router;
        if(children && children instanceof Array){
            children=formatRoutes(children)
        }
        let fmRoutes={
            path:path,
            name:name,
            meta:meta,
            iconCls:iconCls,
            children:children,
            component(resolve){
                require(['../views/'+component+'.vue'],resolve)
            }
        }
        fmRoutes.push(fmRoutes)
    })
    return fmRoutes;
}