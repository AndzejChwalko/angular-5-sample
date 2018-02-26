import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderBy', pure : false })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
        
        if(!records){
            return null;
        }

        return records.sort(function(previous, current){
            if(previous < current){
                return -1 * args.direction;
            }
            else if( previous > current){
                return 1 * args.direction;
            }
            else{
                return 0;
            }
        });
    };
}