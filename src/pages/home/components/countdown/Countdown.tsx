import { useContext, useEffect} from "react";
import { CountDownStyles, Separator } from "./CountdownStyle";
import { CycleContext } from "../../../../contexts/CyclesContext";
import { differenceInSeconds } from "date-fns";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext);

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
          markCurrentCycleAsFinished(); // se a diferença de segundos for maior ou igual ao total de segundos, chama a função que marca o ciclo atual como finalizado
          // setCycles(
          //   (
          //     state //alterando o valor da variavel que armazena os ciclos (cyclo está guadado dentro dessa variavel)
          //   ) =>
          //     state.map((cycle) => {
          //       // percorre o array de ciclos
          //       if (cycle.id === activeCycleId) {
          //         // se o id do ciclo for igual ao id do ciclo ativo
          //         return { ...cycle, finishedDate: new Date() }; //retorna todos os dados do ciclo com a informação da data de interrupção
          //       } else {
          //         return cycle; // se não, retorna o ciclo sem alterações
          //       }
          //     })
          // );

          setSecondsPassed(totalSeconds); // se não, o total de segundos passados vai ser o total de segundos
          clearInterval(interval); // para de executar o intervalo
        } // se a diferença de segundos for maior ou igual ao total de segundos, quer dizer que o ciclo acabou )
        else {
          setSecondsPassed(DifferenceBetweenLastAndActualSeconds); // se não, quer dizer que o ciclo ainda não acabou, então o valor da variavel que armazena a quantidade de segundos passados vai ser a diferença de segundos entre a data atual e a data de inicio do ciclo
        }
      }, 1000); // atualiza a cada segundo
    }

    return () => {
      clearInterval(interval); // limpa o intervalo quando o ciclo ativo for removido
    };
  }, [activeCycle,
     totalSeconds,
      activeCycleId,
       markCurrentCycleAsFinished, 
       setSecondsPassed]); //foi necessário colocar o activeCycle porque ele é de fora do escopo do useEffect, se não colocar ele, o useEffect não vai funcionar

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // se o ciclo ativo existir, o total de segundos vai ser o total de segundos menos o total de segundos passados, se não, o total de segundos vai ser 0
  const minutesAmount = Math.floor(currentSeconds / 60); // arredonda o total de segundos para baixo
  const secondsAmount = currentSeconds % 60; // pega o resto da divisão de currentSeconds por 60

  const minutes = minutesAmount.toString().padStart(2, "0"); // transforma o total de minutos em string e adiciona um 0 na frente se o total de minutos for menor que 10
  const seconds = String(secondsAmount).padStart(2, "0"); // transforma o total de segundos em string e adiciona um 0 na frente se o total de segundos for menor que 10

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`; // altera o titulo da página, mostrando o tempo restante e a tarefa
    }
  }, [minutes, seconds, activeCycleId]); // foi necessário colocar o activeCycleId porque ele é de fora do escopo do useEffect, se não colocar ele, o useEffect não vai funcionar

  return (
    <div>
      <CountDownStyles>
        <span>{minutes[0]}</span>
        <span> {minutes[1]} </span>
        <Separator>:</Separator>
        <span>{seconds[0]} </span>
        <span>{seconds[1]} </span>
      </CountDownStyles>
    </div>
  );
}
