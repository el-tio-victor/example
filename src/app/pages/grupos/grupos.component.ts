import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormArray,FormBuilder} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})

export class GruposComponent implements OnInit {

  groups:any;
  groupDetail:any=[];
  groupDetailF:FormGroup;

  constructor(private endpoint: EndpointsService,
    private fb: FormBuilder) { 
      this.groupDetailF = this.fb.group({
        groupsdetail: this.fb.array([])
      })
  }

  ngOnInit(): void {
    this.loadGroups();
  }

  get groupsdetail(): FormArray{
    return this.groupDetailF.get('groupsdetail') as FormArray;
  }

  newGroupArrF(id:number,name:string):FormGroup{
    return this.fb.group({
      id: id,
      name:name,
      employees:[]
    })
  }

  addGroupArrF(id:number, name:string ){
    this.groupsdetail.push(
      this.newGroupArrF(id,name)
    );
  }

  removeGroupArrF(i:number){
    this.groupsdetail.removeAt(i)
  }

  loadGroups():void{
    this.endpoint.get(
      "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/groups/:tu_nombre"
      )
      .subscribe(
        (response:any) => {
          if(response.success){
            this.groups = response.data.groups
          }
        }
      )
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('if');
    } else {
      console.log('else');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      console.log(this.groupDetail);
      this.addGroupArrF(1,'lalo');
      console.log(this.groupDetailF);
    }
  }

}
