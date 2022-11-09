import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';

import { CrudStatusLabel } from '../enums/status.enum';
import { ProdutoModel } from '../produto.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cruds!: ProdutoModel[];
  displayedColumns: string[] = ['nome', 'status', 'quantidade', 'fornecedor', 'validade', 'categoria', 'edit', 'remove'];
  dataSource!: MatTableDataSource<ProdutoModel>;

  clickedRow!: ProdutoModel;

  constructor(private produtoService: ProdutoService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router) {
      this.matIconRegistry.addSvgIcon("kickstarter",
        this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icones/kickstarter.svg"));
    }

  ngOnInit(): void {
    this.cruds = this.produtoService.listar();
    this.dataSource = new MatTableDataSource(this.cruds);
  }

  listar(): ProdutoModel[] {
    return this.cruds;
  }

  remover(id:string): void {
    this.produtoService.remover(id);
  }

  crudStatusLabel(status:number):string {
    return CrudStatusLabel.get(status)!;
  }
  alterarStatus(id:string) {}
  editar(id:string): void {
    this.router.navigate(["/products/edit",id]);
  }

}
