using MDF.Models.ClassesDeDominio;
using MDF.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MDF.Associations;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MDF.Models.Repositorios
{

    public class TipoMaquinaRepositorio
    {

        private readonly MDFContext _context;

        public TipoMaquinaRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<TipoMaquina>> getTipoMaquinaById(long id)
        {
            var tipoMaquina = await _context.TiposMaquina.FindAsync(id);
            setOperacoesTipoMaquina(tipoMaquina);
            return tipoMaquina;
        }

        public void addTipoMaquina(TipoMaquina newTipoMaquina)
        {
            setOperacoesTipoMaquina(newTipoMaquina);
            _context.TiposMaquina.Add(newTipoMaquina);
            _context.SaveChanges();
        }

        public async void updateTipoMaquina(TipoMaquina update_TipoMaquina)
        {
            _context.Entry(update_TipoMaquina).State = EntityState.Modified;
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

        public async void deleteTipoMaquina(long id)
        {
            var tipoMaquina = await _context.TiposMaquina.FindAsync(id);
            _context.TiposMaquina.Remove(tipoMaquina);
            _context.Entry(tipoMaquina).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

    }
}