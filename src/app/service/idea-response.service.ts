import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdeaResponseService {

  id :number |null | undefined;
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
