using Microsoft.AspNetCore.Mvc;
using CalculadoraApi.Models;

namespace CalculadoraApi.Controllers
{
    [ApiController]
    [Route("calculadora")]
    public class CalculadoraController : ControllerBase
    {
        private static readonly List<Operacao> operacoes = new()
        {
            new Operacao { Nome = "Adição", Valor = "+" },
            new Operacao { Nome = "Subtração", Valor = "-" },
            new Operacao { Nome = "Multiplicação", Valor = "*" },
            new Operacao { Nome = "Divisão", Valor = "/" }
        };

        [HttpGet("operacoes")]
        public ActionResult<IEnumerable<Operacao>> GetOperacoes()
        {
            return Ok(operacoes);
        }
    
        [HttpPost("calcular")]
        public ActionResult<object> Calcular([FromBody] CalculoRequest req)
        {
            double resultado;
            switch (req.Operacao)
            {
                case "+":
                    resultado = req.PrimeiroNumero + req.SegundoNumero;
                    break;
                case "-":
                    resultado = req.PrimeiroNumero - req.SegundoNumero;
                    break;
                case "*":
                    resultado = req.PrimeiroNumero * req.SegundoNumero;
                    break;
                case "/":
                    if (req.SegundoNumero == 0)
                        return BadRequest("Divisão por zero não permitida.");
                    resultado = req.PrimeiroNumero / req.SegundoNumero;
                    break;
                default:
                    return BadRequest("Operação inválida.");
            }
            return Ok(new { resultado });
        }
    }
}
