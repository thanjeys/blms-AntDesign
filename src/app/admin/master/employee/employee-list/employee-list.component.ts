import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor() { }

  defaultColDef = {
    sortable: true,
    filter: true
  };

  columnDefs: ColDef[] = [
    { headerName: 'Make Title', field: 'make' },
    { headerName: 'Model Title', field: 'model' },
    { headerName: 'Price ', field: 'price' }
  ];

  rowData = [];

  ngOnInit() {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }

    // rowData = [
    //     { make: 'Toyota', model: 'Celica', price: 35000 },
    //     { make: 'Ford', model: 'Mondeo', price: 32000 },
    //     { make: 'Porsche', model: 'Boxster', price: 72000 }
    // ];

}
