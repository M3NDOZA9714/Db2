import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { client, clientFilter } from 'src/app/util/interface/cliente.interface';
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

  totalItems: number = 0;
  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private sClient: ClientService, private toastr: ToastrService, private sGlobal: GlobalService) { }

  ngOnInit(): void {
    this.sClient.getCliente().subscribe(rs => {
      this.client = [{ Id: 0, Nombre: "dadsaf", Direccion: "asdfe", RTN: "fdg", Telefono: "45" }];
    })
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

  filterTable = (filters: clientFilter): client[] => {
    const result: { newArr: any[], lengthArr: number } = this.sGlobal.filterTable(this.client, filters);
    this.totalItems = result.lengthArr;
    return result.newArr;
  }

}
