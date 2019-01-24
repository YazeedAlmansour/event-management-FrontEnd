import { Pipe, PipeTransform } from '@angular/core';
import {Events} from './event/event.model';

@Pipe({
  name: 'searchEvent'
})
export class SearchEventPipe implements PipeTransform {

  transform(event: Events[], searchTerm: string): Events[] {
    // check if search term is undefined
    if (!event || !searchTerm) {
      return event;
    }
    return event.filter(e =>
    e.eventname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
