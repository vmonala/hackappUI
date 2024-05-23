import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIdeaComponent } from '../add-idea/add-idea.component';
import { HttpService } from '../service/http.service';
// import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
// import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

import {
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  createGrid,
} from "ag-grid-community";
import { ModuleRegistry, ColDef ,ClientSideRowModelModule} from 'ag-grid-community';
import { IdeaResponseService } from '../service/idea-response.service';
import { Observable } from 'rxjs';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

interface IdeaRow {
  id: number;
  proposedBy: string;
  date: Date;
  title: string;
  description: string;
  interestedMembers: string;
  valueProposition: string;
  department: string;
  theme: string;
  cakeApproval: boolean;
  rating: number;

}



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  constructor(public dialog: MatDialog,private httpService :HttpService) {
    
  }

  gridOptions = {
    // ... other options ...
    alwaysShowVerticalScroll: true,
    alwaysShowHorizontalScroll: true,
  };


  colDefs:ColDef<IdeaResponseService>[] = [
    { field: "id",width: 100},
    { field: "title" },
    { field: "description" },
    { field: "proposedBy" },
    { field: "date" ,
    headerName: "Date of Proposal",
    valueFormatter: (params) => {
      const dateValue = params.value;
      const dateObj = new Date(dateValue);
      const day = ("0" + dateObj.getDate()).slice(-2);
      const month = dateObj.toLocaleString('default', { month: 'short' });
      const year = dateObj.getFullYear();
      return `${day}-${month}-${year}`;
    }
    },
    { field: "interestedMembers"},
    { field: "valueProposition"},
    { field: "department" ,
      headerName: "Support Needed From Department",width:400
    },
    { field: "theme" },
    { field: "cakeApproval",
      headerName: "CAKE 2.0 Approval Needed",
      valueFormatter: (params) => params.value ? 'Yes' : 'No',
      cellRenderer: (params: { value: any; }) => params.value ? '<span style="color:green; font-size:21px; display:flex; justify-content:center; align-items:center;">&#10003;</span>' : ''
     },
    { field: "rating",
    cellRenderer: (params : any) => {
      let rating = params.value;
      let stars = '';
      if (rating === 0) {
        // Display 5 light stars when rating is 0
        for (let i = 0; i < 5; i++) {
          stars += '☆';
        }
      } else {
        for (let i = 0; i < rating; i++) {
          stars += '⭐';
        }
      }
      return stars;
    }
    }
  ];

  themeClass = "ag-theme-alpine";

  isPopupOpen = false;

  public defaultColDef: ColDef = {
    // flex: 1,
    filter: "agTextColumnFilter",
    // floatingFilter: true,
    
  };
  

  openAddIdeaDialog(): void {
    this.isPopupOpen = true;
    const dialogRef = this.dialog.open(AddIdeaComponent, {
      width: '750px',height:'1000px',
      // you can pass data to the dialog like this
      data: { name: 'SHOOT YOUR IDEAS HERE !!!' }
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpen = false;

      console.log('The dialog was closed');
      // result is the data returned from the dialog
      this.ngOnInit();
    });
  }

  public rowSelection: "single" | "multiple" = "multiple";
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10];

  rowDataJson : IdeaResponseService[] = [];
  // rowDataJson$: Observable<IdeaResponseService[]>;


  ngOnInit() {
    console.log("inside ngOnInit of home-page.component.ts");
    this.httpService.getDataAsObject().subscribe((response: IdeaResponseService[]) => {
      console.log("response as json",response);
      this.rowDataJson=response;
      console.log("rowDataJson ",this.rowDataJson);
    });  

}
}
