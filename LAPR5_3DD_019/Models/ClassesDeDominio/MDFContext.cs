using Microsoft.EntityFrameworkCore;
using LAPR5_3DD_019.Models.ValueObjects;
using LAPR5_3DD_019.Models;
using LAPR5_3DD_019.Associations;

namespace LAPR5_3DD_019.Models.ClassesDeDominio
{
    public class MDFContext : DbContext
    {
        public MDFContext(DbContextOptions<MDFContext> options) : base(options) { }

        public DbSet<Operacao> Operacoes { get; set; }
        public DbSet<TipoMaquina> TiposMaquina { get; set; }
        public DbSet<TipoMaquinaOperacao> TipoMaquinaOperacao { get; set; }
        public DbSet<Maquina> Maquinas { get; set; }
        public DbSet<LinhaProducao> LinhasProducao { get; set; }
        public DbSet<LinhaProducaoMaquinas> LinhaProducaoMaquinas { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Operacao
            modelBuilder.Entity<Operacao>().HasKey(j => j.Id);

            modelBuilder.Entity<Operacao>().OwnsOne(j => j.descricaoOperacao);
            modelBuilder.Entity<Operacao>().OwnsOne(j => j.duracaoOperacao);


            //Tipo Maquina
            modelBuilder.Entity<TipoMaquina>().HasKey(a => a.Id);
            modelBuilder.Entity<TipoMaquina>().Property(a => a.Id).ValueGeneratedNever();

            modelBuilder.Entity<TipoMaquina>().OwnsOne(a => a.descricaoTipoMaquina);

            //Tipo Maquina Operacao
            modelBuilder.Entity<TipoMaquinaOperacao>()
                .HasKey(tmo => new { tmo.id_operacao, tmo.id_tipoMaquina });
            modelBuilder.Entity<TipoMaquinaOperacao>()
                .HasOne(tmo => tmo.operacao)
                .WithMany(b => b.tiposMaquinas)
                .HasForeignKey(tmo => tmo.id_operacao);
            modelBuilder.Entity<TipoMaquinaOperacao>()
                .HasOne(tmo => tmo.tipoMaquina)
                .WithMany(c => c.operacoesMaquina)
                .HasForeignKey(tmo => tmo.id_tipoMaquina);

            //Maquina
            modelBuilder.Entity<Maquina>().HasKey(b => b.Id);
            modelBuilder.Entity<Maquina>().Property(b => b.Id).ValueGeneratedNever();

            modelBuilder.Entity<Maquina>().OwnsOne(b => b.nomeMaquina);
            modelBuilder.Entity<Maquina>()
            .HasOne<TipoMaquina>(s => s.tipoMaquina)
            .WithMany(g => g.maquinas)
            .HasForeignKey(s => s.id_tipoMaquina);
            modelBuilder.Entity<Maquina>().OwnsOne(b => b.posicaoLinhaProducao);

            //Linhas de Producao
            modelBuilder.Entity<LinhaProducao>().HasKey(d => d.Id);
            modelBuilder.Entity<LinhaProducao>().Property(d => d.Id).ValueGeneratedNever();

            //Linha Producao Maquina
            modelBuilder.Entity<LinhaProducaoMaquinas>()
                .HasKey(lpm => new { lpm.id_maquina, lpm.id_linhaProducao });
            modelBuilder.Entity<LinhaProducaoMaquinas>()
                .HasOne(lpm => lpm.maquina)
                .WithMany(b => b.linhasProducao)
                .HasForeignKey(lpm => lpm.id_maquina);
            modelBuilder.Entity<LinhaProducaoMaquinas>()
                .HasOne(lpm => lpm.linhaProducao)
                .WithMany(c => c.maquinas)
                .HasForeignKey(lpm => lpm.id_linhaProducao);

            //Produto
            modelBuilder.Entity<Produto>().HasKey(f => f.Id);
            modelBuilder.Entity<Produto>().Property(f => f.Id).HasConversion(g => g.id_produto, g => new ID_Produto(g));

            modelBuilder.Entity<Produto>().OwnsOne(f => f.informacaoProduto);

        }

    }
}