import { differenceInSeconds } from "date-fns";
import { CountDownStyles , Separator} from "./CountdownStyle";

interface CountDownProps{
  activeCycle: any;
  setCycles: any;
  activeCycleId: any;
}

export function Countdown({activeCycle, setCycles, activeCycleId}: CountDownProps) {

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); // quantidade de segundos passados


  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // se o ciclo ativo existir, o total de segundos vai ser o tempo em minutos vezes 60, se não, o total de segundos vai ser 0

  useEffect(() => {
    let interval: number; // variavel que vai armazenar o intervalo

    if (activeCycle) {
      // só quero executar o código se o ciclo ativo existir
      interval = setInterval(() => {
        // setInterval é uma função que executa uma função a cada x milisegundos
        const DifferenceBetweenLastAndActualSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        ); // calcula a diferença de segundos entre a data atual e a data de inicio do ciclo

        if (DifferenceBetweenLastAndActualSeconds >= totalSeconds) {
          setCycles(
            (
              state //alterando o valor da variavel que armazena os ciclos (cyclo está guadado dentro dessa variavel)
            ) =>
              state.map((cycle) => {
                // percorre o array de ciclos
                if (cycle.id === activeCycleId) {
                  // se o id do ciclo for igual ao id do ciclo ativo
                  return { ...cycle, finishedDate: new Date() }; //retorna todos os dados do ciclo com a informação da data de interrupção
                } else {
                  return cycle; // se não, retorna o ciclo sem alterações
                }
              })
          );

          setAmountSecondsPassed(totalSeconds); // se não, o total de segundos passados vai ser o total de segundos
          clearInterval(interval); // para de executar o intervalo
        } // se a diferença de segundos for maior ou igual ao total de segundos, quer dizer que o ciclo acabou )
        else {
          setAmountSecondsPassed(DifferenceBetweenLastAndActualSeconds); // se não, quer dizer que o ciclo ainda não acabou, então o valor da variavel que armazena a quantidade de segundos passados vai ser a diferença de segundos entre a data atual e a data de inicio do ciclo
        }
      }, 1000); // atualiza a cada segundo
    }

    return () => {
      clearInterval(interval); // limpa o intervalo quando o ciclo ativo for removido
    };
  }, [activeCycle, totalSeconds, activeCycleId]); //foi necessário colocar o activeCycle porque ele é de fora do escopo do useEffect, se não colocar ele, o useEffect não vai funcionar



    return(
        <CountDownStyles>
          <span>{minutes[0]}</span>
          <span> {minutes[1]} </span>
          <Separator>:</Separator>
          <span>{seconds[0]} </span>
          <span>{seconds[1]} </span>
        </CountDownStyles>
    )
}

function useState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}


function useEffect(arg0: () => () => void, arg1: any[]) {
  throw new Error("Function not implemented.");
}


function setCycles(arg0: (state: any) => any) {
  throw new Error("Function not implemented.");
}
