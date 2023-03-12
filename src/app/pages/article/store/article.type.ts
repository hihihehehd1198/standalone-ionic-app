

//article message message 

import { ModuleAPI } from "src/app/shared/store/statusAPI.type"


const STATUS = {
    ERROR: "ERROR",
    SUCEESS: "SUCCESS",
    PENDING: "PENDING"
}


const CRUD_ACTION = {
    GET: "GET",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    CREATE: "CREATE"
}


const MODULE = {
    ARICLE: ModuleAPI.ARTICLE,
    BANNER: ModuleAPI.BANNER,
    BRAND: ModuleAPI.BRAND,
    CATEGORY: ModuleAPI.CATEGORY,
    CUSTOMER: ModuleAPI.CUSTOMER,
    SERVICESHOP: ModuleAPI.SERVICESHOP,
    USER: ModuleAPI.USER,
    LOGIN: ModuleAPI.LOGIN
}

const LIST_MODULE = () => {
    const listModule: any = {}
    for (let i of Object.keys(MODULE)) {
        let item: any = {}
        for (let j of Object.keys(CRUD_ACTION)) {
            const status: any = {}
            for (let k of Object.keys(STATUS)) {
                status[k] = j + "_" + i + "_" + (STATUS as any)[k]
            }
            item[j] = status
        }
        listModule[i] = item
        // listModule[i] = item
    }
    return listModule
}

export {
    LIST_MODULE,
    MODULE,
    CRUD_ACTION,
    STATUS
}