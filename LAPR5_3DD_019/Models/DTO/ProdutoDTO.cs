using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models.DTO
{

    public class ProdutoDTO
    {

        public float Id { get; set; }
        public string infoProduto { get; set; }

        public ProdutoDTO(float Id, string infoProduto)
        {
            this.Id = Id;
            this.infoProduto = infoProduto;
        }


    }
}