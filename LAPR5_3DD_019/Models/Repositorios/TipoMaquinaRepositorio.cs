using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LAPR5_3DD_019.Associations;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LAPR5_3DD_019.Models.Repositorios
{

    public class TipoMaquinaRepositorio
    {

        private readonly MDFContext _context;

        public TipoMaquinaRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<TipoMaquinaDTO>> getTipoMaquinaById(long id)
        {
            var tipoMaquina = await _context.TiposMaquina.FindAsync(id);
            setOperacoesTipoMaquina(tipoMaquina);
            return tipoMaquina.toDTO();
        }

        public void addTipoMaquina(TipoMaquina newTipoMaquina)
        {
            setOperacoesTipoMaquina(newTipoMaquina);
            _context.TiposMaquina.Add(newTipoMaquina);
            _context.SaveChanges();
        }

        public async void updateTipoMaquina(TipoMaquina update_TipoMaquina)
        {
            var current_TipoMaquina = await _context.TiposMaquina.FindAsync(update_TipoMaquina.Id);
            current_TipoMaquina.descricaoTipoMaquina = update_TipoMaquina.descricaoTipoMaquina;
            current_TipoMaquina.operacoesMaquina = update_TipoMaquina.operacoesMaquina;
            current_TipoMaquina.maquinas = update_TipoMaquina.maquinas;
            _context.Entry(current_TipoMaquina).State = EntityState.Modified;
            _context.Entry(current_TipoMaquina).State = EntityState.Detached;
            await _context.SaveChangesAsync();
        }

        public void setOperacoesTipoMaquina(TipoMaquina tipoMaquina)
        {
            var all_tipos = _context.TipoMaquinaOperacao;

            foreach (TipoMaquinaOperacao tipo in all_tipos)
            {
                if (tipo.id_tipoMaquina == tipoMaquina.Id)
                {
                    tipo.operacao = _context.Operacoes.Find(tipo.id_operacao);
                    tipoMaquina.addOperacao(tipo);
                }
            }
        }

    }
}