import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormControl,Validators, FormGroup, MaxLengthValidator } from '@angular/forms';
import { EndpointsService } from '../../services/endpoints.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  today=new Date().toISOString().slice(0, 10);
  empleados:any[];
  view_form:boolean = false;
  Request = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    last_name: new FormControl('', [Validators.required,Validators.maxLength(30)]),
    birthday: new FormControl('',Validators.required)
  });

  constructor(
    private endpoint: EndpointsService,
    private router: Router,
  ) { 
    this.endpoint.get(
      "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:tu_nombre"
      )
      .subscribe(
        (response:any)=>{
          if(response.success){
            console.log(response);
            this.empleados = response.data.employees;
            console.log(this.empleados);
            $("#datatable").DataTable({
              pagingType: "full_numbers",
						  lengthMenu: [
						  	[10, 25, 50, -1],
						  	[10, 25, 50, "Todos"],
						  ],
						  bSort: true,
              order:[[0,'desc']],
						  responsive: true,
						  bAutoWidth: false,
						  select: true,
						  columnDefs: [
							  {
								  defaultContent: "-",
								  targets: "_all",
							  },
						  ],
						  language: {
						  	search: "_INPUT_",
							  lengthMenu: "Mostrando  _MENU_ registros",
							  searchPlaceholder: "Buscar registros",
							  info: "Mostrando página _PAGE_ de _PAGES_",
							  zeroRecords: "Ningun registro - sorry",
							  infoEmpty: "No hay registros disponibles",
							  paginate: {
							  	previous: "Anterior",
							  	next: "Siguiente",
							  	first: "Primero",
							  	last: "Último",
							  },
						  },
              data: this.empleados,
              columns:[
                {
                  title: "ID",
                  align: "left",
                  valign: "middle",
                  clickToSelect: false,
                  render: function (data, type, row, meta) {
                    return row.id;
                  },
                },
                {
                  title: "Nombre",
                  align: "left",
                  valign: "middle",
                  clickToSelect: false,
                  render: function (data, type, row, meta) {
                    return row.name +' '+ row.last_name;
                  },
                },
                {
                  title: "Fecha Nac",
                  align: "left",
                  valign: "middle",
                  clickToSelect: false,
                  render: function (data, type, row, meta) {
                    let date = new Date(row.birthday);
                    return date.toLocaleString();
                  },
                },
              ]
            });

          }
        }
        ,error=>console.log(error)
      )
  }
  send():void{
    console.log(this.Request);
    this.endpoint.post(
      "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:tu_nombre",
      this.Request.value
    ).subscribe(
      (response:any)=>{
        console.log(response)
        if(response.success){
          
          window.location.reload();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  
  showForm():void{
    this.view_form = !this.view_form; 
  }

  ngOnInit(): void {
  }

}
