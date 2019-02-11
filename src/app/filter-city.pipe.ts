import { Pipe, PipeTransform } from '@angular/core';
import {Events} from './event/event.model';

@Pipe({
  name: 'filterCity'
})
export class FilterCityPipe implements PipeTransform {

  transform(event: Events[], searchTerm: string): Events[] {
    // check if search term is undefined
    if (!event || !searchTerm) {
      return event;
    }
    return event.filter(e =>
      e.eventlocation.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
