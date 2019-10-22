using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LAPR5_3DD_019.Migrations
{
    public partial class mi2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operacoes_Descricao_descricaoOperacaoId",
                table: "Operacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Operacoes_DuracaoOperacao_duracaoOperacaoId",
                table: "Operacoes");

            migrationBuilder.DropTable(
                name: "Descricao");

            migrationBuilder.DropTable(
                name: "DuracaoOperacao");

            migrationBuilder.DropIndex(
                name: "IX_Operacoes_descricaoOperacaoId",
                table: "Operacoes");

            migrationBuilder.DropIndex(
                name: "IX_Operacoes_duracaoOperacaoId",
                table: "Operacoes");

            migrationBuilder.DropColumn(
                name: "duracaoOperacaoId",
                table: "Operacoes");

            migrationBuilder.RenameColumn(
                name: "descricaoOperacaoId",
                table: "Operacoes",
                newName: "descricaoOperacao_Id");

            migrationBuilder.AlterColumn<string>(
                name: "descricaoOperacao_Id",
                table: "Operacoes",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "duracaoOperacao_hora",
                table: "Operacoes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "duracaoOperacao_min",
                table: "Operacoes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "duracaoOperacao_seg",
                table: "Operacoes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "duracaoOperacao_hora",
                table: "Operacoes");

            migrationBuilder.DropColumn(
                name: "duracaoOperacao_min",
                table: "Operacoes");

            migrationBuilder.DropColumn(
                name: "duracaoOperacao_seg",
                table: "Operacoes");

            migrationBuilder.RenameColumn(
                name: "descricaoOperacao_Id",
                table: "Operacoes",
                newName: "descricaoOperacaoId");

            migrationBuilder.AlterColumn<string>(
                name: "descricaoOperacaoId",
                table: "Operacoes",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "duracaoOperacaoId",
                table: "Operacoes",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Operacoes_descricaoOperacaoId",
                table: "Operacoes",
                column: "descricaoOperacaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Operacoes_duracaoOperacaoId",
                table: "Operacoes",
                column: "duracaoOperacaoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Operacoes_Descricao_descricaoOperacaoId",
                table: "Operacoes",
                column: "descricaoOperacaoId",
                principalTable: "Descricao",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Operacoes_DuracaoOperacao_duracaoOperacaoId",
                table: "Operacoes",
                column: "duracaoOperacaoId",
                principalTable: "DuracaoOperacao",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
