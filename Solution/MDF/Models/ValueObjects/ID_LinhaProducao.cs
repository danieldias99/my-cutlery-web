using MDF.Models.Shared;

namespace MDF.Models.ValueObjects
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