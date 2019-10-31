using MDF.Models.Shared;

namespace MDF.Models.ValueObjects
{
    public class DuracaoOperacao : ValueObject
    {
        public int hora { get; set; }
        public int min { get; set; }
        public int seg { get; set; }

        public DuracaoOperacao() { }

        public DuracaoOperacao(int hora, int min, int sec) { this.hora = hora; this.min = min; this.seg = seg; }

        public string toString()
        {
            return hora.ToString() + ":" + min.ToString() + ":" + seg.ToString();
        }
    }
}