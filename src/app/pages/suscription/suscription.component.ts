import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { client } from 'src/app/util/interface/client.interface';
import { paquete } from 'src/app/util/interface/package.interface';
import { suscription, suscriptionFilter } from 'src/app/util/interface/suscription.interface';
import { technician } from 'src/app/util/interface/technician.interface';
import { ClientService } from 'src/app/util/service/client.service';
import { GlobalService } from 'src/app/util/service/global.service';
import { PackageService } from 'src/app/util/service/package.service';
import { SuscriptionService } from 'src/app/util/service/suscription.service';
import { TechnicianService } from 'src/app/util/service/technician.service';

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription.component.html',
  styleUrls: ['./suscription.component.sass']
})
export class SuscriptionComponent implements OnInit {

  suscription: suscription[] = [];
  client: client[] = [];
  package: paquete[] = [];
  technician: technician[] = [];

  selectedSuscription: Set<suscription> = new Set();

  filters: suscriptionFilter = {
    NombreCliente: "", NombrePaquete: "", NombreTecnico: "", Horas: ""
  }

  id!: number | null;
  idCliente: number | null = 0;
  nombreCliente: string = "";
  idPaquete!: number | null;
  nombrePaquete: string = "";
  idTecnico!: number | null;
  nombreTecnico: string = "";
  horas!: number;

  pageNumber: number = 1;
  pageSize: number = 8;


  constructor(private sSuscription: SuscriptionService,
    private sGlobal: GlobalService,
    private toastr: ToastrService,
    private sClient: ClientService,
    private sTechnician: TechnicianService,
    private sPackage: PackageService
  ) { }

  ngOnInit(): void {
    this.getSuscription();
    this.getCliente();
    this.getTecnico();
    this.getPackage();
  }

  getSuscription = () => {
    this.sSuscription.getSuscripcion().subscribe(rs => {
      this.suscription = rs;
    })
  }

  getCliente = () => {
    this.sClient.getCliente().subscribe(rs => {
      this.client = rs;
    })
  }

  getTecnico = () => {
    this.sTechnician.getTecnico().subscribe(rs => {
      this.technician = rs;
    })
  }

  getPackage = () => {
    this.sPackage.getPaquete().subscribe(rs => {
      this.package = rs;
    })
  }

  loadSuscription = () => {
    const { Id, IdCliente, NombreCliente, IdPaquete, NombrePaquete, IdTecnico, NombreTecnico, Horas } = Array.from(this.selectedSuscription.values())[0];
    this.setParams(Id, IdCliente, NombreCliente, IdPaquete, NombrePaquete, IdTecnico, NombreTecnico, Horas)
  }

  setParams = (id: number | null, idCliente: number | null, nombreCliente: string, idPaquete: number | null, nombrePaquete: string, idTecnico: number | null, nombreTecnico: string, horas: number) => {
    this.id = id;
    this.idCliente = idCliente;
    this.nombreCliente = nombreCliente
    this.idPaquete = idPaquete;
    this.nombrePaquete = nombrePaquete
    this.idTecnico = idTecnico;
    this.nombreTecnico = nombreTecnico;
    this.horas = horas;
  }

  insertSuscripcion = () => {
    this.sSuscription.insertSuscripcion(this.idPaquete, this.idCliente, this.idTecnico, this.horas).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getSuscription();
      } else {
        this.toastr.warning(rs[0].message);
      }
    });
  }

  updateSuscripcion = () => {
    this.sSuscription.updateSuscripcion(this.id, this.idPaquete, this.idCliente, this.idTecnico, this.horas).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.selectedSuscription.clear();
        this.getSuscription();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  addLine = (row: any) => {
    this.sGlobal.addLine(this.selectedSuscription, row);
  }

  valLine = (row: any): boolean => {
    return this.sGlobal.valLine(this.selectedSuscription, row);
  }

  selectAll = () => {
    const newArr = this.filterTable()
    this.sGlobal.selectAll(newArr, this.selectedSuscription);
  }

  filterTable = (): suscription[] => {
    return this.sGlobal.filterTable(this.suscription, this.filters);
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

}
