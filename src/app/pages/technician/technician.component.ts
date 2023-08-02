import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { technician, technicianFilter } from 'src/app/util/interface/technician.interface';
import { GlobalService } from 'src/app/util/service/global.service';
import { TechnicianService } from 'src/app/util/service/technician.service';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.sass']
})
export class TechnicianComponent implements OnInit {

  technician: technician[] = [];

  selectedTechnician: Set<technician> = new Set();

  filters: technicianFilter = {
    Nombre: "", Identidad: "", Correo: "", Telefono: "", Direccion: ""
  }

  id: number = 0;
  nombre: string = "";
  identidad: string = "";
  correo: string = "";
  telefono: string = "";
  direccion: string = "";

  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private sTechnician: TechnicianService, private sGlobal: GlobalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTecnico();
  }

  getTecnico = () => {
    this.sTechnician.getTecnico().subscribe(rs => {
      this.technician = rs;
    })
  }

  insertTecnico = () => {
    this.sTechnician.insertTecnico(this.nombre, this.identidad, this.correo, this.telefono, this.direccion).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getTecnico();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  updateTecnico = () => {
    this.sTechnician.updateTecnico(this.id, this.nombre, this.identidad, this.correo, this.telefono, this.direccion).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.selectedTechnician.clear();
        this.getTecnico();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  loadTecnico = () => {
    const { Id, Nombre, Identidad, Correo, Telefono, Direccion } = Array.from(this.selectedTechnician.values())[0];
    this.setParams(Id, Nombre, Identidad, Correo, Telefono, Direccion);
  }

  addLine = (row: any) => {
    this.sGlobal.addLine(this.selectedTechnician, row);
  }

  valLine = (row: any): boolean => {
    return this.sGlobal.valLine(this.selectedTechnician, row);
  }

  selectAll = () => {
    const newArr = this.filterTable();
    this.sGlobal.selectAll(newArr, this.selectedTechnician);
  }

  filterTable = (): technician[] => {
    return this.sGlobal.filterTable(this.technician, this.filters);
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

  setParams = (id: number, nombre: string, identidad: string, correo: string, telefono: string, direccion: string) => {
    this.id = id;
    this.nombre = nombre;
    this.identidad = identidad;
    this.correo = correo;
    this.telefono = telefono;
    this.direccion = direccion;
  }

}
