using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models.DTO;

namespace LAPR5_3DD_019.Models
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