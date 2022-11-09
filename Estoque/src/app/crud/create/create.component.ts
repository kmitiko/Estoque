import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';

import { ProdutoStatus } from '../enums/status.enum';
import { ProdutoModel } from '../produto.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  crudForm!: FormGroup;
  msg!: string;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService) { }

  ngOnInit(): void {

      this.crudForm = this.formBuilder.group({
      nome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]/)]],
      quantidade:['',[Validators.required,Validators.pattern(/[0-9]/)]],
      fornecedor:['',[Validators.required]],
      validade:['',[Validators.required]],
      categoria:['',[Validators.required]],
    });
  }
  cadastrar(){
    const crud = this.crudForm.getRawValue() as ProdutoModel;
    crud.validade = new Date();
    crud.status = ProdutoStatus.PENDENTE
    this.produtoService.cadastrar(crud);

    this.msg = "Cadastrado com sucesso!"
  }
  get nomeProduto() {return this.crudForm.get("nome")!}
  }








