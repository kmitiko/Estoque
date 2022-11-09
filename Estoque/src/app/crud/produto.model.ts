import { ProdutoStatus } from "./enums/status.enum";

export interface ProdutoModel {
  id: string,
  nome: string,
  status: ProdutoStatus,
  quantidade: number,
  fornecedor: string,
  validade: Date,
  categoria: string,
}
