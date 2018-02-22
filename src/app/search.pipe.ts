import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {

  transform(inputArray: Array<any>, searchText: any): any {
  	if (inputArray){
	    if(!searchText) {
	    	return inputArray;
	    }

	    let arr = inputArray.filter(function(element){
            let flag = false;  
            if( element.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1 ){
                flag = true;
            }
	      return flag;
	    });
	    return arr;
	}
	return inputArray;
  }
}