using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LAPR5_3DD_019.Models.Repositorios
{



    public class ProdutoRepositorio
    {

        private readonly MDFContext _context;

        public ProdutoRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<ProdutoDTO>> getProdutoById(long id)
        {
            var Produto = await _context.Produtos.FindAsync(id);
            return Produto.toDTO();
        }

        public void addProduto(Produto newProduto)
        {
            _context.Produtos.Add(newProduto);
            _context.SaveChanges();
        }

        public async void updateProduto(Produto update_produto)
        {
            var current_produto = await _context.Produtos.FindAsync(update_produto.Id);
            current_produto.informacaoProduto = update_produto.informacaoProduto;
            _context.Entry(current_produto).State = EntityState.Modified;
            _context.Entry(current_produto).State = EntityState.Detached;
            await _context.SaveChangesAsync();
        }

        public async void deleteProduto(long id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            _context.Produtos.Remove(produto);
            _context.Entry(produto).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}