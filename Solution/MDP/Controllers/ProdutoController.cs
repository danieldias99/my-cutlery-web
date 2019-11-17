using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDP.Models.ClassesDeDominio;
using MDP.Models;
using MDP.Models.DTO;
using MDP.Models.Repositorios;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;

namespace MDP.Controllers
{
    [Route("api/Produto")]
    [EnableCors("IT3Client")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        public ProdutoRepositorio repositorio;

        public ProdutoController(MDPContext context)
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
        public async Task<ActionResult<Produto>> PostProduto(ProdutoDTO newProduto)
        {
            repositorio.addProduto(new Produto(newProduto.Id, newProduto.nomeProduto, newProduto.descricaoProduto));
            return CreatedAtAction(nameof(GetProduto), new { id = newProduto.Id }, newProduto);
        }

        // GET: api/ProdutoDTO/
        [HttpGet]
        public async Task<ActionResult<List<ProdutoDTO>>> GetAllProdutoDTO()
        {
            List<ProdutoDTO> listaMaquinasDTO = obterListaProduto((await repositorio.getAllProdutos()).Value);
            return listaMaquinasDTO;
        }

        private List<ProdutoDTO> obterListaProduto(List<Produto> listaProdutoDTO)
        {
            List<ProdutoDTO> listaProduto = new List<ProdutoDTO>();
            foreach (Produto Produto in listaProdutoDTO)
            {
                //repositorio.setMaquinaProduto(Produto);
                listaProduto.Add(Produto.toDTO());
            }
            return listaProduto;
        }

        // PUT: api/Todo/
        [HttpPut]
        public async Task<IActionResult> PutProduto(ProdutoDTO update_produto)
        {
            var produtoDTO = await repositorio.getProdutoById(update_produto.Id);

            if (produtoDTO == null)
            {
                return NotFound();
            }

            repositorio.updateProduto(new Produto(update_produto.Id, update_produto.nomeProduto, update_produto.descricaoProduto));
            return NoContent();
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

            repositorio.deleteProduto(id);

            return NoContent();
        }

    }
}