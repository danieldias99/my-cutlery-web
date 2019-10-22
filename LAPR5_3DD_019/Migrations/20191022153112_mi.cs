using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LAPR5_3DD_019.Migrations
{
    public partial class mi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Descricao",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Descricao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DuracaoOperacao",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    hora = table.Column<int>(nullable: false),
                    min = table.Column<int>(nullable: false),
                    seg = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuracaoOperacao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Operacoes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    descricaoOperacaoId = table.Column<string>(nullable: true),
                    duracaoOperacaoId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operacoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Operacoes_Descricao_descricaoOperacaoId",
                        column: x => x.descricaoOperacaoId,
                        principalTable: "Descricao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Operacoes_DuracaoOperacao_duracaoOperacaoId",
                        column: x => x.duracaoOperacaoId,
                        principalTable: "DuracaoOperacao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Operacoes_descricaoOperacaoId",
                table: "Operacoes",
                column: "descricaoOperacaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Operacoes_duracaoOperacaoId",
                table: "Operacoes",
                column: "duracaoOperacaoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Operacoes");

            migrationBuilder.DropTable(
                name: "Descricao");

            migrationBuilder.DropTable(
                name: "DuracaoOperacao");
        }
    }
}
