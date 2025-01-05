import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto.service';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: '/app-produto-list',
  templateUrl: './produto-list.component.html',
  imports: [
    NgForOf,
    NgbModule,
    NgOptimizedImage,
    NgIf,
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./produto-list.component.css']
})

export class ProdutoListComponent implements OnInit {

  listaDeProdutos: Produto[] = [];
  produtoAtualizar!: Produto;
  produtoExcluido!: Produto;
  private modalService: NgbModal = new NgbModal();

  constructor(private produtoService: ProdutoService) { }

  // Ao abrir a página, chama o endpoint para preencher a lista de produtos
  ngOnInit() {
    this.produtoService.listarProdutos().subscribe(data => {
      // Ordena os produtos por ID, em ordem crescente
      this.listaDeProdutos = data.sort((a, b) => a.id - b.id);
    });
  }

  onSubmit(modal: any) {
    // Chama o service de atualizar o produto no banco de dados
    this.produtoService.atualizarProduto(this.produtoAtualizar.id, this.produtoAtualizar).subscribe();
    modal.close();
    this.atualizarLista();
  }

  // Método para deletar um produto através do id
  deletarProduto(modalDeletar: any, id: number, produto: Produto) {
    this.produtoService.deletarProduto(id).subscribe({
      next: (response) => {
        if (response == true) {
          this.produtoExcluido = produto;
          this.abrirTelaExclusao(modalDeletar);
        }
      }
    })
  }

  // Método para atualizar um produto através do id
  atualizarProduto(modalEditar: any, id: number, produto: Produto) {
    this.produtoService.atualizarProduto(id, produto).subscribe({
      next: (produtoRetornado: Produto) => {
        // Atribui o Produto retornado (produtoRetornado) pelo id fornecido
        // ao produto que será atualizado e abre a tela de edição
        this.produtoAtualizar = produtoRetornado
        this.abrirTelaEdicao(modalEditar)
      }
    })
  }

  // Método que formata o valor para R$ para ser exibido na tabela
  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // Método que atualiza a lista de produtos
  atualizarLista(): void {
    this.produtoService.listarProdutos().subscribe(data => {
      this.listaDeProdutos = data;
    });
  }

  // Função que abre o modal - Janela de edição de produto
  abrirTelaEdicao(modalEditar: any) {
    this.modalService.open(modalEditar);
  }

  // Função que abre o modal - Janela de exclusão de produto
  abrirTelaExclusao(modalExcluir: any) {
    this.modalService.open(modalExcluir);
    this.atualizarLista();
  }

  ativarFrete(ativouFrete: boolean): boolean {
    if (ativouFrete) {
      console.log("TROCOU PARA SIM");
      return true;
    } else {
      console.log("TROCOU PARA NÃO");
      return false;
    }
  }

}
