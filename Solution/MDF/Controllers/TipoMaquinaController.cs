using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MDF.Models.ClassesDeDominio;
using MDF.Models;
using MDF.Models.DTO;
using MDF.Models.Repositorios;
using System.Collections.Generic;
using MDF.Associations;
using Microsoft.AspNetCore.Cors;

namespace MDF.Controllers
{
    [Route("api/TipoMaquina")]
    [EnableCors("IT3Client")]
    [ApiController]
    public class TipoMaquinaController : ControllerBase
    {
        public TipoMaquinaRepositorio repositorio;
        public OperacaoRepositorio repositorio_operacao;

        public TipoMaquinaController(MDFContext context)
        {
            repositorio = new TipoMaquinaRepositorio(context);
            repositorio_operacao = new OperacaoRepositorio(context);
        }

        // GET: api/TipoMaquina/ID
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoMaquinaDTO>> GetTipoMaquina(long id)
        {
            var tipoMaquina = await repositorio.getTipoMaquinaById(id);

            if (tipoMaquina == null)
            {
                return NotFound();
            }

            return tipoMaquina.Value.toDTO();
        }

        // GET: api/TipoMaquina/
        [HttpGet]
        public async Task<ActionResult<List<TipoMaquinaDTO>>> GetAllTipoMaquina()
        {
            List<TipoMaquinaDTO> listaMaquinasDTO = obterListaTipoMaquinasDTO((await repositorio.getAllTipoMaquina()).Value);
            return listaMaquinasDTO;
        }

        private List<TipoMaquinaDTO> obterListaTipoMaquinasDTO(List<TipoMaquina> listaTipoMaquinas)
        {
            List<TipoMaquinaDTO> listaTipoMaquinasDTO = new List<TipoMaquinaDTO>();
            foreach (TipoMaquina TipoMaquina in listaTipoMaquinas)
            {
                repositorio.setOperacoesTipoMaquina(TipoMaquina);
                listaTipoMaquinasDTO.Add(TipoMaquina.toDTO());
            }
            return listaTipoMaquinasDTO;
        }

        // POST: api/TipoMaquina
        [HttpPost]
        public async Task<ActionResult<TipoMaquina>> PostTipoMaquina(TipoMaquinaDTO newTipoMaquina)
        {
            repositorio.addTipoMaquina(new TipoMaquina(newTipoMaquina.id_tipoMaquina, newTipoMaquina.descricaoTipoMaquina, newTipoMaquina.operacoes));
            return CreatedAtAction(nameof(GetTipoMaquina), new { id = newTipoMaquina.id_tipoMaquina }, newTipoMaquina);
        }

        // PUT: api/Todo/5
        [HttpPut]
        public async Task<IActionResult> PutTipoMaquina(TipoMaquinaDTO update_TipoMaquina)
        {
            var tipoMaquina = await repositorio.getTipoMaquinaById(update_TipoMaquina.id_tipoMaquina);

            if (tipoMaquina == null)
            {
                return NotFound("O tipo de máquina escolhido não existe!");
            }

            var new_list_operacoes = new List<TipoMaquinaOperacao>();

            foreach (OperacaoDTO TipoMaquinaDTO in update_TipoMaquina.operacoes)
            {
                var TipoMaquina = await repositorio_operacao.getOperacaoById(TipoMaquinaDTO.Id);

                if (TipoMaquina == null)
                {
                    return NotFound("A operação " + TipoMaquinaDTO.Id + " não existe!");
                }

                new_list_operacoes.Add(new TipoMaquinaOperacao(tipoMaquina.Value.id_tipoMaquina, TipoMaquina.Value.Id));
            }

            if (!tipoMaquina.Value.update_operacoes(new_list_operacoes))
            {
                return BadRequest("Não foi possivel alterar operações deste tipo de máquina!");
            }

            tipoMaquina.Value.descricaoTipoMaquina = new Models.ValueObjects.Descricao(update_TipoMaquina.descricaoTipoMaquina);

            repositorio.updateTipoMaquina(tipoMaquina.Value);
            //return Ok("Tipo de Máquina alterado com sucesso!");
            return NoContent();
        }

        // DELETE: api/TipoMaquina/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoMaquinaDTO>> DeleteTipoMaquina(long id)
        {
            var tipoMaquina = await GetTipoMaquina(id);

            if (tipoMaquina == null)
            {
                return NotFound();
            }

            repositorio.deleteTipoMaquina(id);

            return NoContent();
        }
    }
}