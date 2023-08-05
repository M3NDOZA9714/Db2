import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { bank, bankFilter } from 'src/app/util/interface/bank.interface';
import { BankService } from 'src/app/util/service/bank.service';
import { GlobalService } from 'src/app/util/service/global.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.sass']
})
export class BankComponent implements OnInit {

  bank: bank[] = [];

  selectedBank: Set<bank> = new Set();

  filters: bankFilter = {
    Nombre: "", Cuenta: ""
  }

  id: number = 0;
  nombre: string = "";
  cuenta: string = "";

  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private sBank: BankService, private sGlobal: GlobalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBanco();
  }

  getBanco = () => {
    this.sBank.getBanco().subscribe(rs => {
      this.bank = rs;
    })
  }

  loadBanco = () => {
    const { Id, Nombre, Cuenta } = Array.from(this.selectedBank.values())[0];
    this.setParams(Id, Nombre, Cuenta);
  }

  insertBanco = () => {
    this.sBank.insertBanco(this.nombre, this.cuenta).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getBanco();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  updateBanco = () => {
    this.sBank.updateBanco(this.id, this.nombre, this.cuenta).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.selectedBank.clear();
        this.getBanco();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  deleteBanco = () => {
    const arr = Array.from(this.selectedBank)
    this.sBank.deleteBanco(arr[0].Id).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.selectedBank.clear();
        this.getBanco();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  setParams = (id: number, nombre: string, cuenta: string) => {
    this.id = id;
    this.nombre = nombre;
    this.cuenta = cuenta;
  }

  valLine = (set: Set<any>, row: any) => {
    return set.has(row);
  }

  addLine = (row: any) => {
    this.sGlobal.addLine(this.selectedBank, row);
  }

  filterTable = (): bank[] => {
    return this.sGlobal.filterTable(this.bank, this.filters);
  }

  selectAll = () => {
    const newArr = this.filterTable();
    this.sGlobal.selectAll(newArr, this.selectedBank);
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

}
