using MDF.Models.ClassesDeDominio;
using MDF.Models.DTO;
using MDF.Associations;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MDF.Models.Repositorios
{

    public class MaquinaRepositorio
    {

        private readonly MDFContext _context;

        public MaquinaRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<MaquinaDTO>> getMaquinaById(long Id)
        {
            var maquina = await _context.Maquinas.FindAsync(Id);
            maquina.tipoMaquina = (await _context.TiposMaquina.FindAsync(maquina.id_tipoMaquina));
            setLinhasProducaoMaquina(maquina);
            return maquina.toDTO();
        }

        public void setLinhasProducaoMaquina(Maquina maquina)
        {
            var all_linhas = _context.LinhaProducaoMaquinas;

            foreach (LinhaProducaoMaquinas linha in all_linhas)
            {
                if (linha.id_maquina == maquina.Id)
                {
                    linha.linhaProducao = _context.LinhasProducao.Find(linha.id_linhaProducao);
                    maquina.addLinha(linha);
                }
            }
        }

        public void addMaquina(Maquina newMaquina)
        {
            _context.Maquinas.Add(newMaquina);
            _context.SaveChanges();
        }

        public async void updateMaquina(Maquina update_Maquina)
        {
            var current_Maquina = await _context.Maquinas.FindAsync(update_Maquina.Id);
            current_Maquina.id_tipoMaquina = update_Maquina.id_tipoMaquina;
            current_Maquina.nomeMaquina = update_Maquina.nomeMaquina;
            current_Maquina.posicaoLinhaProducao = update_Maquina.posicaoLinhaProducao;
            current_Maquina.linhasProducao = update_Maquina.linhasProducao;
            _context.Entry(current_Maquina).State = EntityState.Modified;
            _context.Entry(current_Maquina).State = EntityState.Detached;
            await _context.SaveChangesAsync();
        }

        public async void deleteMaquina(long id)
        {
            var Maquina = await _context.Maquinas.FindAsync(id);
            _context.Maquinas.Remove(Maquina);
            _context.Entry(Maquina).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}
