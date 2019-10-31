using MDF.Models.Shared;

namespace MDF.Models.ValueObjects
{
    public class InfoProduto : ValueObject
    {

        public string nomeProduto { set; get; }
        public string descricaoProduto { set; get; }

        public InfoProduto() { }

        public InfoProduto(string nome)
        {
            this.nomeProduto = nome;
        }
    }
}