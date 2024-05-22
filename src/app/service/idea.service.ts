import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  proposedBy : string|null | undefined;
  date :Date |null | undefined;
  title : string |null | undefined;
  description : string |null | undefined;
  interestedMembers : string |null | undefined;
  valueProposition : string |null | undefined;
  department : string |null | undefined;
  theme : string |null | undefined;
  cakeApproval : boolean |null | undefined;
  rating : number |null | undefined;

}
