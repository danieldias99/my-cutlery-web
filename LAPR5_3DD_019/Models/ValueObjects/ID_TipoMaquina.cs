using LAPR5_3DD_019.Models.Shared;

namespace LAPR5_3DD_019.Models.ValueObjects
{

    public class ID_TipoMaquina : ValueObject
    {

        public float id_TipoMaquina { get; set; }

        public ID_TipoMaquina()
        {

        }

        public ID_TipoMaquina(float value)
        {
            this.id_TipoMaquina = value;
        }
    }
}