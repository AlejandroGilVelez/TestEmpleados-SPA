import { Component, OnInit } from '@angular/core';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../shared/services/empleado.service';
import { MessageService } from 'primeng/api';
import { GlobalFilterService } from '../shared/services/global-filter.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  recordsEmpleados: Array<Empleado> = [];
  empleadoSeleccionado: Empleado;
  empleado: string;
  

  constructor(private empleadoService: EmpleadoService,
              private messageService: MessageService,
              private route: Router,
              private globalFilterService: GlobalFilterService) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  buscar(empleado: string){
    // console.log(`Tengo que buscar alguna mkda pero mandemela ps Idiota + ${empleado}`);
    if (empleado == null || empleado.length == 0) {
        this.obtenerEmpleados();
      return;
    }
    this.empleadoService.buscarEmpleado(empleado).subscribe(
      (response) => {
        if (response == null || response.length == 0) {
          this.messageService.add({
            severity: "warn",
            summary: "Búsqueda",
            detail: "No se encontraron empleados.",
          });      
        }
        this.recordsEmpleados = [...response];
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar el empleado buscado."
        });
      }
    );
  }

  obtenerEmpleados(){
    this.empleadoService.obtenerEmpleados().subscribe(
      (response) => {
        this.recordsEmpleados = [...response];
      },
      (error) => {
        this.onReject();
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar lista de empleados."
        });
      }
    )
  }

  agregarEmpleado(){
    this.globalFilterService.empleadoSeleccionado = null;    
    this.globalFilterService.areaSeleccionada = null;
    this.globalFilterService.subAreaSeleccionada = null;
    this.route.navigate(["/empleado-editar"]);
  }

  editar(row: Empleado){
    this.globalFilterService.empleadoSeleccionado = row;
    // this.globalFilterService.areaSeleccionada.id = row.areaId;
    // this.globalFilterService.subAreaSeleccionada.id = row.subAreaId;
    this.route.navigate(["/empleado-editar"]);
  }

  eliminar(row: Empleado){
    this.empleadoSeleccionado = row;
    this.messageService.clear();
      this.messageService.add({
        key: "c",
        sticky: true,
        severity: "warn",
        summary: "Eliminar el Usuario?",
        detail: "Esta seguro que desea eliminar el empleado"
      });
  }

  onConfirm(){
    this.empleadoService.eliminarEmpleado(this.empleadoSeleccionado.id).subscribe(
      (response) => {
        this.onReject();
        this.obtenerEmpleados();
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al guardar",
          detail: "Ocurrió un error al momento de guardar"
        });
      }
    );
  }

  onReject(){
    this.messageService.clear("c");
  }

}
