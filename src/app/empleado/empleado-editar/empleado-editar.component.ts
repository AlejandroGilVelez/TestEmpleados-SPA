import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../shared/services/empleado.service';
import { MessageService } from 'primeng/api';
import { GlobalFilterService } from '../../shared/services/global-filter.service';
import { TiposIdentificacion } from '../../models/tiposidentificacion';
import { TiposidentificacionService } from '../../shared/services/tiposidentificacion.service';
import { AreaService } from '../../shared/services/area.service';
import { Area } from '../../models/area';
import { SubArea } from '../../models/subarea';
import { SubareaService } from '../../shared/services/subarea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-editar',
  templateUrl: './empleado-editar.component.html',
  styleUrls: ['./empleado-editar.component.css']
})
export class EmpleadoEditarComponent implements OnInit {

  cargarSubAreas: Array<SubArea> = [];  
  cargarAreas: Array<Area> = [];
  cargarTiposDocumentosIdentidad: Array<TiposIdentificacion> = [];
  empleadoSeleccionado: Empleado;
  areaSeleccionada = new Area();
  subAreaSeleccionada = new SubArea();
  esNuevoEmpleado: boolean;

  constructor(private empleadoService: EmpleadoService,
              private messageService: MessageService,
              private globalFilterService: GlobalFilterService,
              private tiposidentificacionService: TiposidentificacionService,
              private areaService: AreaService,
              private subareaService: SubareaService,
              private route: Router) { }

  ngOnInit(): void {
    this.obtenerTiposDocumentos();
    this.obtenerAreas();
    this.esNuevoEmpleado = true;

    this.empleadoSeleccionado = this.globalFilterService.empleadoSeleccionado;

    if (this.empleadoSeleccionado != null) {
      // Editando
      this.empleadoAntiguo(this.empleadoSeleccionado.id);
      this.esNuevoEmpleado = false;
      this.areaSeleccionada.id = this.empleadoSeleccionado.areaId;
      this.subAreaSeleccionada.id = this.empleadoSeleccionado.subAreaId;      
    } else {
      this.empleadoSeleccionado = new Empleado();
      this.empleadoSeleccionado.tipoIdentificacionId = "";
      this.areaSeleccionada.id = "";
      this.subAreaSeleccionada.id = "";      
    }
  }

  obtenerTiposDocumentos(){
    this.tiposidentificacionService.obtenerTiposIdentificaciones().subscribe(
      (response) => {
        this.cargarTiposDocumentosIdentidad = [...response];
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar los tipos de documentos"
        });          
      }
    )
  }

  obtenerAreas(){
    this.areaService.obtenerAreas().subscribe(
      (response) => {
        this.cargarAreas = [...response];        
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar las áreas"
        });   
      }
    )
  }

  obtenerSubAreas(id: string){
    this.subareaService.obtenerSubAreas(id).subscribe(
      (response) => {
        this.cargarSubAreas = [...response];
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar las Subáreas"
        });  
      }
    )
  }

  empleadoAntiguo(id: string){
    this.empleadoService.obtenerEmpleado(id).subscribe(
      (response) => {
        this.empleadoSeleccionado = response;
        this.obtenerSubAreas(this.areaSeleccionada.id);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar el usuario"
        });
      }
    );
  }

  guardar(){
    if(!this.validaciones()){      
      return;
    }

    if (this.esNuevoEmpleado) {
      this.empleadoSeleccionado.areaId = this.areaSeleccionada.id;
      this.empleadoSeleccionado.subAreaId = this.subAreaSeleccionada.id;
      this.empleadoService.crearEmpleado(this.empleadoSeleccionado).subscribe(
        (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Guadado exitoso",
            detail: "El empleado se creó correctamente"
          });
          this.route.navigate(["/empleado"]);          
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error al guardar",
            detail: "Ocurrió un error al momento de guardar el empleado"
          });
        }
      );
    } else {
      this.empleadoSeleccionado.subAreaId = this.subAreaSeleccionada.id;
      this.empleadoService.editarEmpleado(this.empleadoSeleccionado).subscribe(
        (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Guadado exitoso",
            detail: "El empleado se actualizó correctamente"
          });
          this.route.navigate(["/empleado"]);  
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error al guardar",
            detail: "Ocurrió un error al momento de guardar el empleado"
          });
        }
      );
    }
  }

  cancelar(){
    this.route.navigate(["/empleado"]);
  }

  areaCambio(e: any){
    if (this.areaSeleccionada.id == "") {
      return;
    }
    this.empleadoSeleccionado.areaId = this.areaSeleccionada.id;    
    this.obtenerSubAreas(this.areaSeleccionada.id);
  }

  subAreaCambio(e: any){
    if (this.areaSeleccionada.id == "") {
      return;
    }
    this.empleadoSeleccionado.subAreaId = this.subAreaSeleccionada.id;
  }

  validaciones(): boolean{
    if(this.empleadoSeleccionado.nombres == null || this.empleadoSeleccionado.nombres.length == 0){
      this.messageService.add({
        severity: "warn",
        summary: "Nombre Inválido",
        detail: "Digite un nombre",
      });      
      return false;
    }
    if(this.empleadoSeleccionado.apellidos == null || this.empleadoSeleccionado.apellidos.length == 0){
      this.messageService.add({
        severity: "warn",
        summary: "Apellido Inválido",
        detail: "Digite un apellido",
      });      
      return false;      
    }
    if(this.empleadoSeleccionado.tipoIdentificacionId == null || this.empleadoSeleccionado.tipoIdentificacionId.length == 0){
      this.messageService.add({
        severity: "warn",
        summary: "Tipo Identificación Inválido",
        detail: "Seleccione un tipo de identificación",
      });      
      return false;      
    }    
    if(this.empleadoSeleccionado.nroIdentificacion == null){
      this.messageService.add({
        severity: "warn",
        summary: "Número de Identificación Inválido",
        detail: "Digite un número de identificación",
      });      
      return false;      
    }
    if(this.empleadoSeleccionado.areaId == null){
      this.messageService.add({
        severity: "warn",
        summary: "Tipo Área Inválido",
        detail: "Seleccione un área",
      });      
      return false;      
    }
    if(this.empleadoSeleccionado.subAreaId == null){
      this.messageService.add({
        severity: "warn",
        summary: "Tipo Subárea Inválido",
        detail: "Seleccione un subárea",
      });      
      return false;      
    }      
    if(this.empleadoSeleccionado.email == null || this.empleadoSeleccionado.email.length == 0){
      this.messageService.add({
        severity: "warn",
        summary: "Email Inválido",
        detail: "Digite un correo",
      });      
      return false;      
    }    
    return true;
  }

}
