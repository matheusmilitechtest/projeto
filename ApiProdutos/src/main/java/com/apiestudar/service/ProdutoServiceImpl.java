package com.apiestudar.service;

import com.apiestudar.exceptions.RetornouFalseException;
import com.apiestudar.exceptions.RetornouNuloException;
import com.apiestudar.model.Produto;
import com.apiestudar.repository.ProdutoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoServiceImpl implements ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	@Override
	public Produto adicionarProduto(Produto produto) {
		return produtoRepository.save(produto);
	}

	@Override
	public List<Produto> listarProdutos() {
		return produtoRepository.findAll();
	}

	@Override
	public Produto atualizarProduto(long id, Produto produtoAtualizado) {
		// Chama o método e busca o produto pelo id no repositório
		Optional<Produto> produto = produtoRepository.findById(id);
		// Se não encontrou o produto...
		if (produto.isPresent() == false)
			throw new RetornouNuloException("Registro não encontrado no banco de dados. Retorno = NULL.");
		// Se encontrou o produto ele seta os novos atributos, salva e retorna pro
		// controller.
		else {
			produto.get().setNome(produtoAtualizado.getNome());
			produto.get().setDescricao(produtoAtualizado.getDescricao());
			produto.get().setTipo(produtoAtualizado.getTipo());
			produto.get().setFrete(produtoAtualizado.getFrete());
			produto.get().setPromocao(produtoAtualizado.isPromocao());
			produto.get().setValorTotalDesc(produtoAtualizado.getValorTotalDesc());
			produto.get().setValorTotalFrete(produtoAtualizado.getValorTotalFrete());
			produto.get().setValor(produtoAtualizado.getValor());
			produto.get().setQuantia(produtoAtualizado.getQuantia());
			produto.get().setPeso(produtoAtualizado.getPeso());
			produto.get().setSomaTotalValores(produtoAtualizado.getSomaTotalValores());
			produto.get().setFreteAtivo(produtoAtualizado.isFreteAtivo());
			produtoRepository.save(produto.get());
			return produto.get();
		}
	}

	@Override
	public boolean deletarProduto(long id) {
		// Procura o produto pelo id, se encontrar e for != false ele deleta e retorna
		// "true" para o controller
		if (produtoRepository.findById(id).isPresent() == true) {
			produtoRepository.deleteById(id);
			return true;
		} else
			throw new RetornouFalseException("Registro não encontrado no banco de dados. Retorno = FALSE.");
	}

	@Override
	public List<Produto> listarProdutoMaisCaro() {
		return produtoRepository.listarProdutoMaisCaro();
	}
	
	@Override
	public Double obterMediaPreco() {
		Optional<Double> valor = Optional.ofNullable(produtoRepository.obterMediaPreco());
		return valor.orElse(0.0);
	}

}