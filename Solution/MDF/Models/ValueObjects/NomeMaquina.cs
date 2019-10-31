using MDF.Models.Shared;

namespace MDF.Models.ValueObjects
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