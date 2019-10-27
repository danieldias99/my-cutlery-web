using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models.DTO
{

    public class ProdutoDTO
    {

        public long Id { get; set; }
        public string infoProduto { get; set; }

        public ProdutoDTO(long Id, string infoProduto)
        {
            this.Id = Id;
            this.infoProduto = infoProduto;
        }

        public Produto toProduto(){
            return new Produto(Id, new InfoProduto(infoProduto));
        }

    }
}