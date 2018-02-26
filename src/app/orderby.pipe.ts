import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderBy', pure : false })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): Array<any> {
        if(!records){
            return null;
        }

        const sorted = records.sort(function(previous, current){
            if(previous < current){
                return -1 /** args.direction*/;
            }
            else if( previous > current){
                return 1 /** args.direction*/;
            }
            else{
                return 0;
            }
        });
        return sorted;
    };
}