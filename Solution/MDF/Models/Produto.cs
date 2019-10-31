using MDF.Models.Shared;
using MDF.Models.ValueObjects;
using MDF.Models.DTO;

namespace MDF.Models
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

        public ProdutoDTO toDTO()
        {
            return new ProdutoDTO(Id, informacaoProduto.nomeProduto, informacaoProduto.descricaoProduto);
        }
    }


}