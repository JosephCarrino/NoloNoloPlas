import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content-suggest',
  templateUrl: './dialog-content-suggest.component.html',
  styleUrls: ['./dialog-content-suggest.component.css']
})
export class DialogContentSuggestComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
