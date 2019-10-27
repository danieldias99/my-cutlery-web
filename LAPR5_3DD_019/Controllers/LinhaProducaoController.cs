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

        public LinhaProducaoController(MDFContext context)
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

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<ActionResult<LinhaProducaoDTO>> PutLinhaProducao(long id, LinhaProducao update_linha)
        {
            var linha = await repositorio.getLinhaProducaoById(id);

            if (linha == null)
            {
                return NotFound();
            }

            if (id != update_linha.Id)
            {
                return BadRequest();
            }

            repositorio.updateLinhaProducao(update_linha);
            return NoContent();
        }

        // DELETE: api/LinhaProducao/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LinhaProducaoDTO>> DeleteLinhaProducao(long id)
        {
            var linha = await GetLinhaProducao(id);

            if (linha == null)
            {
                return NotFound();
            }

            repositorio.deleteLinhaProducao(id);

            return NoContent();
        }
    }
}