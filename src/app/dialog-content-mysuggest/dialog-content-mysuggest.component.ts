import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content-mysuggest',
  templateUrl: './dialog-content-mysuggest.component.html',
  styleUrls: ['./dialog-content-mysuggest.component.css']
})
export class DialogContentMysuggestComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
