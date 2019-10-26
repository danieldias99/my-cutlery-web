using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models.DTO;

namespace LAPR5_3DD_019.Models
{
    public class Produto : Entity, IAggregateRoot
    {

        public ID_Produto Id{ get; set; }
        public InfoProduto informacaoProduto{ get; set; }

         public ProdutoDTO toDTO(){
            return new ProdutoDTO(Id.id_produto, informacaoProduto.nomeProduto);
        }
    }

    
}