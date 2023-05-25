import { ChangeDetectorRef, Pipe, PipeTransform, inject } from '@angular/core';
import { ProductItem } from './store/product.type';
import { CategoryItem } from '../category/store/category.types';

@Pipe({
  name: 'productPipe',
  standalone: true,
})
export class ProductPipe implements PipeTransform {
  transform(listProduct: any) {
    const formatList = listProduct?.map((x: any) => {
      const newProductItemFormat = {
        ...x,
        brandName: x?.Brand?.brandName || '',
        categoryName: x?.Category?.map((y: any) => y.name).join(',') || []
      }
      delete newProductItemFormat['Category']
      delete newProductItemFormat['Brand']

      return newProductItemFormat
    })
    console.log("formatList", formatList)
    return formatList || []
  }

}
