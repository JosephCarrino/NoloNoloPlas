import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content-delete',
  templateUrl: './dialog-content-delete.component.html',
  styleUrls: ['./dialog-content-delete.component.css']
})
export class DialogContentDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
