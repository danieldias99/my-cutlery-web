using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LAPR5_3DD_019.Models.Repositorios{

    

    public class ProdutoRepositorio{

        private readonly MDFContext _context;

        public ProdutoRepositorio(MDFContext context){
            _context = context;
        }

        public async Task<ActionResult<ProdutoDTO>> getProdutoById(long id){
            var Produto = await _context.Produtos.FindAsync(id);
            return Produto.toDTO();
        }

        public void addProduto(Produto newProduto){
            _context.Produtos.Add(newProduto);
            _context.SaveChanges();
        }

        public void deleteProduto(Produto produto)
        {
            _context.Produtos.Remove(produto);
            _context.SaveChanges();
        }
    }
}