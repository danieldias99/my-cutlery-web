using LAPR5_3DD_019.Models.Shared;

namespace LAPR5_3DD_019.Models.ValueObjects
{
    public class ID_LinhaProducao : ValueObject
    {
        public float id_LinhaProducao { get; set; }

        public ID_LinhaProducao(float value)
        {
            this.id_LinhaProducao = value;
        }
    }
}