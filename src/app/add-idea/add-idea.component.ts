import { Component, Inject ,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IdeaService } from '../service/idea.service';
import { HttpService } from '../service/http.service';
import { IdeaResponseService } from '../service/idea-response.service';
import { FormBuilder, Validators } from '@angular/forms';



export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.css']
})
export class AddIdeaComponent implements OnInit{

  valuePropositionOptions: string[] = ['Comments', 'Non-comments'];
   ideaInternal = new IdeaService();

  ideaForm = new FormGroup({
    proposedBy: new FormControl(''),
    // date: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    interestedMembers: new FormControl(),
    valueProposition: new FormControl('') ,// Fix: Change from [''] to new FormControl('')
    department: new FormControl(''),
    theme: new FormControl(''),
    cakeApproval: new FormControl(),
    test : new FormControl(''),
  });
  
condition: boolean = true;


  ngOnInit() {
    
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.ideaForm.value);
    // console.log(this.ideaForm.value.date);
    this.ideaInternal.proposedBy= this.ideaForm.value.proposedBy;
    this.ideaInternal.title = this.ideaForm.value.title;
    this.ideaInternal.description = this.ideaForm.value.description;
    this.ideaInternal.interestedMembers = this.ideaForm.value.interestedMembers;
    this.ideaInternal.valueProposition = this.ideaForm.value.valueProposition;
    this.ideaInternal.department = this.ideaForm.value.department;
    this.ideaInternal.theme = this.ideaForm.value.theme;
    //this.ideaInternal.cakeApproval = this.ideaForm.value.cakeApproval;
    this.ideaInternal.rating = 0;
    this.ideaInternal.date = new Date();

    let cakeApproval: boolean = this.ideaForm.value.cakeApproval.toLowerCase() === 'yes';
    this.ideaInternal.cakeApproval = cakeApproval;
   
    console.log('this is for http get request');
    this.httpService.getData().subscribe(data => {
      console.log(data);
    });

    console.log('return json list');
    console.log(this.ideaInternal);


    console.log('this is for http post request');

    this.httpService.postData(this.ideaInternal).subscribe(response => {
      console.log(response);
    });

    // console.log('return json list');
    // this.httpService.getDataAsObject().subscribe((response: IdeaResponseService) => {
    //   console.log("response as json",response);
    // });
    
  }

  constructor(private formBuilder: FormBuilder,ideaService: IdeaService,private httpService :HttpService,
    public dialogRef: MatDialogRef<AddIdeaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.ideaForm = this.formBuilder.group({
        proposedBy: ['', Validators.required],
        title: [''],
        description: [''],
        interestedMembers: [''],
        valueProposition: [''],
        department: [''],
        theme: [''],
        cakeApproval: [false],
        test : [''],
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectionChange(event: MatSelectChange) {
    // Now you can access `event.value` and `event.source`
    console.log('this is called');
    if(this.ideaForm.value.valueProposition === 'customerExperience'|| this.ideaForm.value.valueProposition === 'consumers' || this.ideaForm.value.valueProposition === 'hoursSaved' || this.ideaForm.value.valueProposition ===''){
      this.condition = false;
    }
  }
}

