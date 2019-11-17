using MDP.Models.Shared;
using MDP.Models.ValueObjects;
using MDP.Models.DTO;

namespace MDP.Models
{
    public class Produto : Entity, IAggregateRoot
    {

        public long Id { get; set; }
        public InfoProduto informacaoProduto { get; set; }


        public Produto() { }

        public Produto(long id, InfoProduto nomeProduto)
        {
            this.Id = id;
            this.informacaoProduto = nomeProduto;
        }

        public Produto(long id, string nomeProduto, string descricaoProduto)
        {
            this.Id = id;
            this.informacaoProduto = new InfoProduto(nomeProduto, descricaoProduto);
        }

        public ProdutoDTO toDTO()
        {
            return new ProdutoDTO(Id, informacaoProduto.nomeProduto, informacaoProduto.descricaoProduto);
        }
    }


}