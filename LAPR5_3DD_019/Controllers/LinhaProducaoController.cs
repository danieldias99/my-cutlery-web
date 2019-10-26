using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Models.DTO;
using LAPR5_3DD_019.Models.Repositorios;

namespace LAPR5_3DD_019.Controllers
{
    [Route("api/LinhaProducao")]
    [ApiController]
    public class LinhaProducaoController : ControllerBase
    {
        public LinhaProducaoRepositorio repositorio;

        public LinhaProducaoController(LAPR5DBContext context)
        {
            repositorio = new LinhaProducaoRepositorio(context);
        }

        // GET: api/LinhaProducao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LinhaProducaoDTO>> GetLinhaProducao(long id)
        {
            var linhaProducaoDTO = await repositorio.getLinhaProducaoById(id);

            if (linhaProducaoDTO == null)
            {
                return NotFound();
            }

            return linhaProducaoDTO;
        }

        // POST: api/LinhaProducao
        [HttpPost]
        public async Task<ActionResult<LinhaProducaoDTO>> PostLinhaProducao(LinhaProducao newLinhaProducao)
        {
            repositorio.addLinhaProducao(newLinhaProducao);
            return CreatedAtAction(nameof(GetLinhaProducao), new { id = newLinhaProducao.Id }, newLinhaProducao);
        }

        /*// PUT: api/LinhaProducao/5
        [HttpPut]
        public async Task<ActionResult<LinhaProducao>> PutLinhaProducao(LinhaProducao newLinhaProducao)
        {
            var linha = await GetLinhaProducao(newLinhaProducao.Id);

            if (linha == null)
            {
                return NotFound();
            }


            repositorio.updateLinhaProducao(linha.Value.toLinhaProducao(),newLinhaProducao);

            return NoContent();
        }*/

        // DELETE: api/LinhaProducao/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LinhaProducaoDTO>> DeleteLinhaProducao(long id)
        {
            var linha = await GetLinhaProducao(id);

            if (linha == null)
            {
                return NotFound();
            }

            repositorio.deleteLinhaProducaoById(linha.Value.toLinhaProducao());

            return NoContent();
        }
    }
}