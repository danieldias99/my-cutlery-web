using LAPR5_3DD_019.Models.Shared;

namespace LAPR5_3DD_019.Models.ValueObjects
{

    public class NomeMaquina : ValueObject
    {

        public string nomeMaquina { get; set; }

        public NomeMaquina(){}

        public NomeMaquina(string value)
        {
            this.nomeMaquina = value;
        }
    }
}