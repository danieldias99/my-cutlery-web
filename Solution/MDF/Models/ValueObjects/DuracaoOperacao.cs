using MDF.Models.Shared;

namespace MDF.Models.ValueObjects
{
    public class DuracaoOperacao : ValueObject
    {
        public string hora { get; set; }
        public string min { get; set; }
        public string seg { get; set; }

        public DuracaoOperacao() { }

        public DuracaoOperacao(string hora, string min, string sec) { this.hora = hora; this.min = min; this.seg = sec; }

        public string toString()
        {
            return hora + ":" + min + ":" + seg;
        }
    }
}