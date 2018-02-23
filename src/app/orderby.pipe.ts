import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderBy', pure : false })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
        if(!records){
            return null;
        }

        let props = [];
        if (args.property.includes('.')){
            props = args.property.split('.');
        } else {
            props.push(args.property);
        }

        return records.sort(function(previous, current){
            let criteriaPrevious = previous[props[0]];
            let criteriaCurrent = current[props[0]];
            for(let i = 1; i < props.length; i++){
                criteriaPrevious = criteriaPrevious[props[i]];
                criteriaCurrent = criteriaCurrent[props[i]];
            }

            if(criteriaPrevious < criteriaCurrent){
                return -1 * args.direction;
            }
            else if( criteriaPrevious > criteriaCurrent){
                return 1 * args.direction;
            }
            else{
                return 0;
            }
        });
    };
}