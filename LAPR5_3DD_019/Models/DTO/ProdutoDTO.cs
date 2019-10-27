using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models.DTO
{

    public class ProdutoDTO
    {

        public long Id { get; set; }
        public string nomeProduto { get; set; }
        public string descricaoProduto { get; set; }

        public ProdutoDTO(long Id, string nomeProduto, string descricaoProduto)
        {
            this.Id = Id;
            this.nomeProduto = nomeProduto;
            this.descricaoProduto = descricaoProduto;
        }
    }
}