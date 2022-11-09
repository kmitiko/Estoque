import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

import { ProdutoStatus } from '../crud/enums/status.enum';
import { ProdutoModel } from '../crud/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() { }

  cadastrar(crud: ProdutoModel): void {
    let cruds:ProdutoModel[] = this.listar();
    crud.id = uuid.v4();
    cruds.push(crud);
    console.log(cruds);
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
  atualizar(crud: ProdutoModel): void {
    let cruds:ProdutoModel[] = this.listar();

    for(let i = 0; i < cruds.length; i++) {
      if(crud.id === cruds[i].id) {
        cruds[i] = crud;
      }
    }
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
  localizarPortId(id:string): ProdutoModel {
    const cruds:ProdutoModel[] = this.listar();
    let crud!:ProdutoModel;
    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id === id) {
        crud = cruds[i];
        break;
      }
    }
    return crud;
  }
  listar(): ProdutoModel [] {

     return JSON.parse(localStorage.getItem('cruds')!) as ProdutoModel[] ?? [];
  }
  remover(id: string): void {
    let cruds:ProdutoModel[] = this.listar();

    let novoCruds: ProdutoModel[] = [];
    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id !== id) {
        novoCruds.push(cruds[i]);
      }
    }
    cruds = novoCruds;
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
  alteraStatus(id:string, status:ProdutoStatus) {
    const cruds:ProdutoModel[] = this.listar();

    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id === id) {
        cruds[i].status = status;
        if(status === ProdutoStatus.CONCLUIDO) {
          cruds[i].validade = new Date();
        }
        break;
      }
    }
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
}
