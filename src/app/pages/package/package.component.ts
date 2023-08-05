import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { paquete, paqueteFilter, servicio, servicePackageFilter, serviceFilter } from 'src/app/util/interface/package.interface';
import { service } from 'src/app/util/interface/service.interface';
import { GlobalService } from 'src/app/util/service/global.service';
import { PackageService } from 'src/app/util/service/package.service';
import { ServiceService } from 'src/app/util/service/service.service';
declare var $: any;

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.sass']
})
export class PackageComponent implements OnInit {

  @ViewChild('firstModal') myModal: any;
  @ViewChild('secondModal') mySecondModal: any;

  paquete: paquete[] = [];

  selectedPackage: Set<paquete> = new Set();
  selectedService: Set<servicio> = new Set();
  selectedServices: Set<service> = new Set();

  packageFilters: paqueteFilter = {
    Nombre: "",
    Descripcion: "",
    Precio: ""
  }

  serviceFilters: servicePackageFilter = {
    NombreServicio: "",
    DescripcionServicio: ""
  }

  servicesFilters: serviceFilter = {
    Nombre: "", Descripcion: ""
  }

  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  precio!: number | null;
  servicio: servicio[] = [];
  servicios: service[] = [];

  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private toastr: ToastrService, private sService: ServiceService, private sPackage: PackageService, private sGlobal: GlobalService) { }

  ngOnInit(): void {
    this.getPaquete();
  }

  ngAfterViewInit() {
    $(this.mySecondModal.nativeElement).on('hidden.bs.modal', () => {
      $(this.myModal.nativeElement).modal('show');
    });
  }

  getPaquete = () => {
    this.sPackage.getPaquete().subscribe(rs => {
      this.paquete = rs;
    })
  }

  setParams = (id: number, nombre: string, descripcion: string, precio: number | null, servicio: servicio[]) => {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.servicio = servicio;
  }

  loadPaquete = () => {
    const { Id, Nombre, Precio, Descripcion } = Array.from(this.selectedPackage.values())[0];

    this.getServicio(Id);

    this.setParams(Id, Nombre, Descripcion, Precio, this.servicio);
  }

  getServicios = () => {
    this.sService.getServicio().subscribe(rs => {
      this.servicios = rs;
    })
  }

  getServicio = (IdPaquete: number) => {
    this.sPackage.getServicioPaquete(IdPaquete).subscribe(rs => {
      this.servicio = rs;
    })
  }

  filterTable = (arr: any, filters: any): any[] => {
    return this.sGlobal.filterTable(arr, filters);
  }

  valLine = (set: Set<any>, row: any): boolean => {
    return this.sGlobal.valLine(set, row);
  }

  addLine = (set: Set<any>, row: any) => {
    this.sGlobal.addLine(set, row);
  }

  selectAll = (arr: any, filters: any, set: Set<any>) => {
    const newArr = this.filterTable(arr, filters)
    this.sGlobal.selectAll(newArr, set);
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

  addServiceToPackage = () => {
    const arr = Array.from(this.selectedServices)

    var el: servicio[] = [];

    arr.map((row) => {
      var cont = 0;
      this.servicio.map(element => {
        if (row.Id == element.IdServicio) {
          cont++;
        }
      })
      if (!cont) {
        el.push({
          Id: 0,
          IdPaquete: 0,
          NombrePaquete: "",
          IdServicio: row.Id,
          NombreServicio: row.Nombre,
          DescripcionServicio: row.Descripcion
        })
      }
    })

    if (el.length) {
      this.servicio = this.servicio.concat(el);
      this.selectedServices.clear();
      this.toastr.success("Se han agragado las líneas");
    } else {
      this.toastr.warning("No se agregó ninguna línea");
    }
  }

  removeLine = () => {
    this.servicio = this.servicio.filter(row => {
      return !this.selectedService.has(row);
    })
    this.selectedService.clear();
  }

  insertPaquete = () => {
    this.sPackage.insertPaquete(this.nombre, this.descripcion, this.precio, this.servicio).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getPaquete();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  updatePaquete = () => {
    this.sPackage.updatePaquete(this.id, this.nombre, this.descripcion, this.precio, this.servicio).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getPaquete();
        this.selectedPackage.clear();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  deletePaquete = () => {
    const arr = Array.from(this.selectedPackage)
    this.sPackage.deletePaquete(arr[0].Id).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getPaquete();
        this.selectedPackage.clear();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

}
