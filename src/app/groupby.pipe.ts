import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupBy',
    pure: false
})
export class GroupByPipe implements PipeTransform {

    transform(collection: Array<any>, args: any): Array<any> {
        if(!collection){
            return null;
        }

        let groupProps = [];
        if (args.groupBy.includes('.')){
            groupProps = args.groupBy.split('.');
        } else {
            groupProps.push(args.groupBy);
        }

        let orderProps = [];
        if (args.orderBy.includes('.')){
            orderProps = args.orderBy.split('.');
        } else {
            orderProps.push(args.orderBy);
        }
        
        let grouped = collection.reduce((previous, current) => {
            let criteria = current[groupProps[0]];
            for(let i = 1; i < groupProps.length; i++){
                criteria = criteria[groupProps[i]];
            }

            if(!previous[criteria]){
                previous[criteria] = [current];
            } else {
                previous[criteria].push(current);
            }

            return previous;
        }, {});

        let values = Object.keys(grouped).map(key => ({ key, value: grouped[key] }));

        values.forEach(group =>{
            group.value.sort((previous, current)=>{
                let criteriaPrevious = previous[orderProps[0]];
                let criteriaCurrent = current[orderProps[0]];
                for(let i = 1; i < orderProps.length; i++){
                    criteriaPrevious = criteriaPrevious[orderProps[i]];
                    criteriaCurrent = criteriaCurrent[orderProps[i]];
                }
                
                if(args.typeOrder === 'number'){
                    criteriaCurrent = parseInt(criteriaCurrent);
                    criteriaPrevious = parseInt(criteriaPrevious);
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
        });
        
        let result = values.reduce((prev, curr)=>{
            return prev.concat(Object.values(curr.value));
        },[]);
        
        return result;
    }
}