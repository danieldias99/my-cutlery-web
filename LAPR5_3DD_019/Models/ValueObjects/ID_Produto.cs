using LAPR5_3DD_019.Models.Shared;

namespace LAPR5_3DD_019.Models.ValueObjects
{
    public class ID_Produto : ValueObject
    {
        public float id_produto{ get; set; }

        public ID_Produto(float value)
        {
            this.id_produto = value;
        }
    }
}
