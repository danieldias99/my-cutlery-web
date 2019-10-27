using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.DTO;
using LAPR5_3DD_019.Models.Repositorios;

namespace LAPR5_3DD_019.Controllers
{
    [Route("api/Produto")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        public ProdutoRepositorio repositorio;

        public ProdutoController(MDFContext context)
        {
            repositorio = new ProdutoRepositorio(context);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoDTO>> GetProduto(long id)
        {
            var ProdutoDTO = await repositorio.getProdutoById(id);

            if (ProdutoDTO == null)
            {
                return NotFound();
            }

            return ProdutoDTO;
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> PostProduto(Produto newProduto)
        {
            repositorio.addProduto(newProduto);
            return CreatedAtAction(nameof(GetProduto), new { id = newProduto.Id }, newProduto);
        }

        // DELETE: api/Produto/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProdutoDTO>> DeleteProduto(long id)
        {
            var produto = await GetProduto(id);

            if (produto == null)
            {
                return NotFound();
            }
            
            repositorio.deleteProduto(produto.Value.toProduto());

            return NoContent();
        }

    }
}