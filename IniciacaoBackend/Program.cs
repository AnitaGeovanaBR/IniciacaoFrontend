using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    });
});

// configurar porta 5055 que é a padrão do meu Host (Achei interessante descobrir pelo swagger do navegador)
builder.WebHost.UseUrls("http://localhost:5055");

var app = builder.Build();

app.UseCors();

app.MapGet("/api/calculadora/operacoes", () =>
{
    var ops = new[] {
        new { nome = "Adição", sigla = "+", valor = "+" },
        new { nome = "Subtração", sigla = "-", valor = "-" },
        new { nome = "Multiplicação", sigla = "*", valor = "*" },
        new { nome = "Divisão", sigla = "/", valor = "/" }
    };
    return Results.Ok(ops);
});

app.MapPost("/api/calculadora/calcular", async (RequestCalculo dto) =>
{
    if (dto == null)
    {
        return Results.BadRequest(new { mensagem = "Requisição inválida" });
    }

    double num1 = dto.Num1;
    double num2 = dto.Num2;
    string op = dto.Operacao ?? string.Empty;

    double resultado;
    switch (op)
    {
        case "+": resultado = num1 + num2; break;
        case "-": resultado = num1 - num2; break;
        case "*": resultado = num1 * num2; break;
        case "/":
            if (num2 == 0)
                return Results.BadRequest(new { mensagem = "Não é possível dividir um número por zero." });
            resultado = num1 / num2; break;
        default:
            return Results.BadRequest(new { mensagem = "Operação inválida." });
    }

    return Results.Ok(new resultadoCalculo(resultado));
});

app.Run();

public record RequestCalculo(double Num1, double Num2, string? Operacao);
public record resultadoCalculo(double Resultado);
