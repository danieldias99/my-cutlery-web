using LAPR5_3DD_019.Models.Shared;
using LAPR5_3DD_019.Models.ValueObjects;

namespace LAPR5_3DD_019.Models
{
    public class Produto : Entity, IAggregateRoot
    {

        public ID_Produto Id{ get; set; }
        public InfoProduto informacaoProduto{ get; set; }

    }
}