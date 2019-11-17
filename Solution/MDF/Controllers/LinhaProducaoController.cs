using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDF.Models.ClassesDeDominio;
using MDF.Models;
using MDF.Models.DTO;
using MDF.Models.Repositorios;
using MDF.Associations;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;

namespace MDF.Controllers
{
    [Route("api/LinhaProducao")]
    [EnableCors("IT3Client")]
    [ApiController]
    public class LinhaProducaoController : ControllerBase
    {
        public LinhaProducaoRepositorio repositorio;

        public MaquinaRepositorio repositorio_maquina;

        public LinhaProducaoController(MDFContext context)
        {
            repositorio = new LinhaProducaoRepositorio(context);
            repositorio_maquina = new MaquinaRepositorio(context);
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

            return linhaProducaoDTO.Value.toDTO();
        }

        // GET: api/LinhaProducaoDTO/
        [HttpGet]
        public async Task<ActionResult<List<LinhaProducaoDTO>>> GetAllLinhaProducaoDTO()
        {
            List<LinhaProducaoDTO> listaMaquinasDTO = obterListaLinhaProducao((await repositorio.getAllLinhasProducao()).Value);
            return listaMaquinasDTO;
        }

        private List<LinhaProducaoDTO> obterListaLinhaProducao(List<LinhaProducao> listaLinhaProducaoDTO)
        {
            List<LinhaProducaoDTO> listaLinhaProducao = new List<LinhaProducaoDTO>();
            foreach (LinhaProducao linhaProducao in listaLinhaProducaoDTO)
            {
                repositorio.setMaquinaLinhaProducao(linhaProducao);
                listaLinhaProducao.Add(linhaProducao.toDTO());
            }
            return listaLinhaProducao;
        }

        // POST: api/LinhaProducao
        [HttpPost]
        public async Task<ActionResult<LinhaProducaoDTO>> PostLinhaProducao(LinhaProducaoDTO newLinhaProducao)
        {
            repositorio.addLinhaProducao(new LinhaProducao(newLinhaProducao.id, newLinhaProducao.maquinas));
            return CreatedAtAction(nameof(GetLinhaProducao), new { id = newLinhaProducao.id }, newLinhaProducao);
        }

        // PUT: api/Todo/5
        [HttpPut]
        public async Task<ActionResult<LinhaProducaoDTO>> PutLinhaProducao(LinhaProducaoDTO update_linha)
        {
            var linha = await repositorio.getLinhaProducaoById(update_linha.id);

            if (linha == null)
            {
                return NotFound();
            }

            var new_list_maquinas = new List<LinhaProducaoMaquinas>();

            foreach (MaquinaDTO maquinaDTO in update_linha.maquinas)
            {
                var maquina = await repositorio_maquina.getMaquinaById(maquinaDTO.Id);

                if (maquina == null)
                {
                    return NotFound("A operação " + maquinaDTO.Id + " não existe!");
                }

                new_list_maquinas.Add(new LinhaProducaoMaquinas(linha.Value.id, maquina.Value.Id));
            }

            if (!linha.Value.update_linhaProducao(new_list_maquinas))
            {
                return BadRequest("Não foi possivel alterar operações deste tipo de máquina!");
            }

            repositorio.updateLinhaProducao(linha.Value);
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