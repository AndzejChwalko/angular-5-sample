import {PipeTransform, Pipe} from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
  	if (search){
	    var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	    pattern = pattern.split(' ').filter((t) => {
	      return t.length > 0;
	    }).join('|');
	    var regex = new RegExp(pattern, 'gi');
	    return (search && text) ? text.toString().replace(regex, (match) => `<b>${match}</b>`) : text;
	}
	return text;
  }
}