import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderBy', pure : false })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
        if (records && records.length){
            let properties = args.properties;
            let props = [];
            for(let i =0 ; i < properties.length; i++){
                if (properties[i].key.search(".") > -1){
                    props[i] = (properties[i].key).split(".");
                } else {
                    props[i] = properties[i].key;
                }
            }

            for (let i = 0; i < props.length; i++){
                records.sort(function(a, b){
                let one = a[props[0][0]], two = b[props[0][0]];
                    for(let j = 1; j < props[i].length; j++){
                        one = one[props[i][j]];
                        two = two[props[i][j]];
                    }

                    if (properties[i].type === 'number') {
                        one = parseInt(one);
                        two = parseInt(two);
                    }

                    if(one < two){
                        return -1 * args.direction;
                    }
                    else if(one > two){
                        return 1 * args.direction;
                    }
                    else{
                        return 0;
                    }
                });
            }
            return records;
        }
    };
}