using Microsoft.EntityFrameworkCore;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models;

namespace LAPR5_3DD_019.Models.ClassesDeDominio
{
    public class MDFContext : DbContext
    {
        public MDFContext(DbContextOptions<MDFContext> options) : base(options) { }

        public DbSet<Operacao> Operacoes { get; set; }
        public DbSet<TipoMaquina> TiposMaquina { get; set; }
        public DbSet<Maquina> Maquinas { get; set; }
        public DbSet<LinhaProducao> LinhasProducao { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Operacao
            modelBuilder.Entity<Operacao>().HasKey(j => j.Id);

            modelBuilder.Entity<Operacao>().OwnsOne(j => j.descricaoOperacao);
            modelBuilder.Entity<Operacao>().OwnsOne(j => j.duracaoOperacao);

            //Tipo Maquina
            modelBuilder.Entity<TipoMaquina>().HasKey(a => a.Id);
            modelBuilder.Entity<TipoMaquina>().Property(a => a.Id).HasConversion(v => v.id_TipoMaquina, v => new ID_TipoMaquina(v));

            modelBuilder.Entity<TipoMaquina>().OwnsOne(a => a.descricaoTipoMaquina);

            //Maquina
            modelBuilder.Entity<Maquina>().HasKey(b => b.nomeMaquina);
            modelBuilder.Entity<Maquina>().Property(b => b.nomeMaquina).HasConversion(c => c.nomeMaquina, c => new NomeMaquina(c));


            modelBuilder.Entity<Maquina>().HasOne(b => b.tipoMaquina);
            modelBuilder.Entity<Maquina>().OwnsOne(b => b.posicaoLinhaProducao);

            //Linhas de Producao
            modelBuilder.Entity<LinhaProducao>().HasKey(d => d.Id);
            modelBuilder.Entity<LinhaProducao>().Property(d => d.Id).HasConversion(e => e.id_LinhaProducao, e => new ID_LinhaProducao(e));

            modelBuilder.Entity<LinhaProducao>().HasMany(d => d.maquinas).WithOne();

            //Produto
            modelBuilder.Entity<Produto>().HasKey(f => f.Id);
            modelBuilder.Entity<Produto>().Property(f => f.Id).HasConversion(g => g.id_produto, g => new ID_Produto(g));

            modelBuilder.Entity<Produto>().OwnsOne(f => f.informacaoProduto);

        }

    }
}