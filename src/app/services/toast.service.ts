import { Injectable, ViewContainerRef } from "@angular/core";
import { timer } from "rxjs";
import { GET_ARTICLE_ACTION_FAILURE, GET_ARTICLE_ACTION_SUCCESS } from "../pages/article/store/article.action";
import { ToastComponent } from "../shared/toast/toast.page";
import { ToastInput } from "../shared/toast/toastInput.type";
import { TypedAction } from "@ngrx/store/src/models";



@Injectable({
    providedIn: 'any'
})

export class ToastService {
    generateToast(res: any, containerRef?: ViewContainerRef) {
        const viewContainerRef = containerRef
        let dataResponse!: ToastInput;
        if (typeof res === 'string' || "error" in res) {
            dataResponse = {
                title: 'error case',
                body: res?.error || res,
                iconType: 'error'
            }
        } else {
            if (res?.type?.toString().toLowerCase().includes('fail')) {
                console.log(res)
                dataResponse = {
                    title: 'error case',
                    body: res['error']['message'],
                    iconType: 'error'
                }
            }
            if (res?.type?.toString().toLowerCase().includes('success')) {
                dataResponse = {
                    title: 'success case',
                    body: 'thanh cong  !',
                    iconType: 'success'
                }
            }
        }

        // debugger;
        // const viewContainerRef = this.host?.viewContainerRef;
        viewContainerRef?.clear()
        const componentRef = viewContainerRef?.createComponent(ToastComponent)
        if (componentRef) {
            componentRef.instance.inputData = dataResponse
        }
        timer(100000).subscribe({
            complete: () => viewContainerRef?.clear()
        })
    }
}