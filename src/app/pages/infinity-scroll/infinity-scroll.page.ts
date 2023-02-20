import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewInit, inject, ChangeDetectorRef } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-infinity-scroll',
    templateUrl: 'infinity-scroll.page.html',
    styleUrls: ['infinity-scroll.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfinityScrollComponent implements AfterViewInit {

    items: { name: string }[] = []
    cdf = inject(ChangeDetectorRef)
    ngAfterViewInit(): void {
        this.generateItem()
        this.cdf.detectChanges()
    }


    generateItem(index: number = 0) {
        for (let i = index; i < index + 100; i++) {
            const item = { name: `name_${i}` }
            this.items.push(item)
        }
        console.log(this.items.length)
        this.cdf.detectChanges()
    }

    onIonInfinite(e: any) {
        const length = this.items.length
        this.generateItem(length);
        setTimeout(() => {
            (e as InfiniteScrollCustomEvent).target.complete()
        }, 3000)
    }
}
