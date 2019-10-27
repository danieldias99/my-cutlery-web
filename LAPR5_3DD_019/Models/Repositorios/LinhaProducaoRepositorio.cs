using LAPR5_3DD_019.Models.ClassesDeDominio;
using LAPR5_3DD_019.Models.DTO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LAPR5_3DD_019.Associations;
using Microsoft.EntityFrameworkCore;
using System;

namespace LAPR5_3DD_019.Models.Repositorios
{

    public class LinhaProducaoRepositorio
    {

        private readonly MDFContext _context;

        public LinhaProducaoRepositorio(MDFContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<LinhaProducaoDTO>> getLinhaProducaoById(long id)
        {
            var linhaOp = await _context.LinhasProducao.FindAsync(id);
            setMaquinaLinhaProducao(linhaOp);
            return linhaOp.toDTO();
        }


        public void addLinhaProducao(LinhaProducao newLinhaProducao)
        {
            setMaquinaLinhaProducao(newLinhaProducao);
            _context.LinhasProducao.Add(newLinhaProducao);
            _context.SaveChanges();
        }

        public void setMaquinaLinhaProducao(LinhaProducao linhaProducao)
        {
            var all_linhasProducao = _context.LinhaProducaoMaquinas;

            foreach (LinhaProducaoMaquinas linha in all_linhasProducao)
            {
                if (linha.id_linhaProducao == linhaProducao.Id)
                {
                    linha.maquina = _context.Maquinas.Find(linha.id_maquina);
                    linhaProducao.addMaquina(linha);
                }
            }
        }

        public async void updateLinhaProducao(LinhaProducao update_linha)
        {
            var current_linha = await _context.LinhasProducao.FindAsync(update_linha.Id);
            current_linha.maquinas = update_linha.maquinas;
            _context.Entry(current_linha).State = EntityState.Modified;
            _context.Entry(current_linha).State = EntityState.Detached;
            await _context.SaveChangesAsync();
        }

        public async void deleteLinhaProducao(long id)
        {
            var linha = await _context.LinhasProducao.FindAsync(id);
            _context.LinhasProducao.Remove(linha);
            _context.Entry(linha).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}