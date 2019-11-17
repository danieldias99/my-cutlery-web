using MDP.Models.Shared;

namespace MDP.Models.ValueObjects
{
    public class InfoProduto : ValueObject
    {

        public string nomeProduto { set; get; }
        public string descricaoProduto { set; get; }

        public InfoProduto() { }

        public InfoProduto(string nome, string descricaoProduto)
        {
            this.nomeProduto = nome;
            this.descricaoProduto = descricaoProduto;
        }
    }
}