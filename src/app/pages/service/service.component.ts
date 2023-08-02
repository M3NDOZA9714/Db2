import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { service, serviceFilter } from 'src/app/util/interface/service.interface';
import { GlobalService } from 'src/app/util/service/global.service';
import { ServiceService } from 'src/app/util/service/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {

  service: service[] = [];

  filters: serviceFilter = {
    Nombre: "", Descripcion: "", Precio: ""
  }

  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  precio!: number | null;

  selectedService: Set<service> = new Set();

  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private sService: ServiceService, private toastr: ToastrService, private sGlobal: GlobalService) { }

  ngOnInit(): void {
    this.getServicio();
  }

  getServicio = () => {
    this.sService.getServicio().subscribe(rs => {
      this.service = rs;
    })
  }

  filterTable = (): service[] => {
    return this.sGlobal.filterTable(this.service, this.filters);
  }

  valLine = (set: Set<any>, row: any) => {
    return set.has(row);
  }

  addLine = (set: Set<any>, row: any) => {
    if (set.has(row)) {
      set.delete(row);
    } else {
      set.add(row);
    }
  }

  selectAll = () => {
    const arr = this.filterTable();
    if (this.selectedService.size == arr.length) {
      this.selectedService.clear();
    } else {
      this.selectedService.clear();
      arr.forEach(element => {
        this.selectedService.add(element);
      });
    }
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

  insertServicio = () => {
    this.sService.insertServicio(this.nombre, this.descripcion, this.precio).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getServicio();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  updateServicio = () => {
    this.sService.updateServicio(this.id, this.nombre, this.descripcion, this.precio).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getServicio();
        this.selectedService.clear();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  loadServicio = () => {
    const { Id, Nombre, Descripcion, Precio } = Array.from(this.selectedService.values())[0];
    this.setParams(Id, Nombre, Descripcion, Precio);
  }

  setParams = (id: number, nombre: string, descripcion: string, precio: number | null) => {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio
  }

}
