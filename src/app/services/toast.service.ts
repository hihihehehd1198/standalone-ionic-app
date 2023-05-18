import { Injectable, ViewContainerRef } from "@angular/core";
import { timer } from "rxjs";
import { GET_ARTICLE_ACTION_FAILURE, GET_ARTICLE_ACTION_SUCCESS } from "../pages/article/store/article.action";
import { ToastComponent } from "../shared/toast/toast.page";
import { ToastInput } from "../shared/toast/toastInput.type";



@Injectable({
    providedIn: 'any'
})

export class ToastService {
    generateToast(res: any, containerRef?: ViewContainerRef) {
        const viewContainerRef = containerRef
        let dataResponse!: ToastInput;
        if (res.type.toString().toLowerCase().includes('fail')) {
            dataResponse = {
                title: 'error case',
                body: 'loi he thong !',
                iconType: 'error'
            }
        }
        if (res.type.toString().toLowerCase().includes('success')) {
            dataResponse = {
                title: 'success case',
                body: 'thanh cong  !',
                iconType: 'success'
            }
        }

        // const viewContainerRef = this.host?.viewContainerRef;
        viewContainerRef?.clear()
        const componentRef = viewContainerRef?.createComponent(ToastComponent)
        if (componentRef) {
            componentRef.instance.inputData = dataResponse
        }
        timer(1000).subscribe({
            complete: () => viewContainerRef?.clear()
        })
    }
}