import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstLetter',
    pure: false
})
export class FirstLetterPipe implements PipeTransform {

    transform(collection: Array<any>, args?: any): Array<any> {
        if(!collection){
            return null;
        }

        const grouped = collection.reduce((prev, curr) => {
            if (!prev[curr.charAt(0)]){
                prev[curr.charAt(0)] = [curr];
            } else {
                prev[curr.charAt(0)].push(curr);
            }
            return prev;
        }, {});

        console.log(Object.keys(grouped).map(key => ({ key, value: grouped[key] })));

        return Object.keys(grouped).map(key => ({ key, value: grouped[key] }));
    }

}