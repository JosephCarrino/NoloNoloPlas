import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content-replace',
  templateUrl: './dialog-content-replace.component.html',
  styleUrls: ['./dialog-content-replace.component.css']
})
export class DialogContentReplaceComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
