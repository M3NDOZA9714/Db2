import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { client, clientFilter } from 'src/app/util/interface/client.interface';
import { ClientService } from 'src/app/util/service/client.service';
import { GlobalService } from 'src/app/util/service/global.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  client: client[] = [];

  filters: clientFilter = {
    Nombre: "", Direccion: "", RTN: "", Telefono: ""
  }

  id: number = 0;
  nombre: string = "Danilo";
  direccion: string = "";
  telefono: string = "";
  rtn: string = "";

  selectedClient: Set<client> = new Set();

  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private sClient: ClientService, private toastr: ToastrService, private sGlobal: GlobalService) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente = () => {
    this.sClient.getCliente().subscribe(rs => {
      this.client = rs;
    })
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

  filterTable = (): client[] => {
    return this.sGlobal.filterTable(this.client, this.filters);
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
    if (this.selectedClient.size == arr.length) {
      this.selectedClient.clear();
    } else {
      this.selectedClient.clear();
      arr.forEach(element => {
        this.selectedClient.add(element);
      });
    }
  }

  insertCliente = () => {
    this.sClient.insertCliente(this.nombre, this.direccion, this.telefono, this.rtn).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getCliente();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  updateCliente = () => {
    this.sClient.updateCliente(this.id, this.nombre, this.direccion, this.telefono, this.rtn).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getCliente();
        this.selectedClient.clear();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  deleteCliente = () => {
    const arr = Array.from(this.selectedClient)
    this.sClient.deleteCliente(arr[0].Id).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getCliente();
        this.selectedClient.clear();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  loadCliente = () => {
    const { Id, Nombre, Direccion, Telefono, RTN } = Array.from(this.selectedClient.values())[0];
    this.setParams(Id, Nombre, Direccion, Telefono, RTN);
  }

  setParams = (id: number, nombre: string, direccion: string, telefono: string, rtn: string) => {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.rtn = rtn;
  }

}
