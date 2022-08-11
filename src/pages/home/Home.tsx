import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  CountDownStyles,
  FormStyles,
  HomeStyles,
  Separator,
  StartButtonStyles,
  StopButtonStyles,
  TaskInputStyles,
  TimerInputStyles,
} from "./HomeStyles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe uma tarefa"),
  minutesAmount: zod.number().min(1).max(60),
});

//interface newCycleFormData {
//task: string;
//minutesAmount: number;
//}

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycleprops {
  task: string; // tarefa dada pelo usuário
  minutesAmount: number; // tempo em minutos
  id: string; // representa o id do ciclo, cada ciclo precisa ter um id (que vai funciona como identificador historico)
  startDate: Date; // data que ele começou
  interruptedDate?: Date; // data que ele foi interrompido (se for interrompido pois é opctional)
  finishedDate?: Date; // data que ele foi finalizado (se for finalizado pois é opctional)
}

export function Home() {
  const [cycles, setCycles] = useState<Cycleprops[]>([]); // lista de ciclos (cyclo está guadado dentro dessa variavel)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycleprops = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // data atual
    };

    setCycles((state) => [...state, newCycle]); //adiciona o novo ciclo no array de ciclos, usando o spread operator para manter os ciclos anteriores e clousure para manter o estado atual
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); // procura o ciclo ativo no array de ciclos pelo id
  console.log(activeCycle);

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

  function handleInterruptCycle() {
    setCycles(
      (
        state //alterando o valor da variavel que armazena os ciclos (cyclo está guadado dentro dessa variavel)
      ) =>
        state.map((cycle) => {
          // percorre o array de ciclos
          if (cycle.id === activeCycleId) {
            // se o id do ciclo for igual ao id do ciclo ativo
            return { ...cycle, interruptedDate: new Date() }; //retorna todos os dados do ciclo com a informação da data de interrupção
          } else {
            return cycle; // se não, retorna o ciclo sem alterações
          }
        })
    );
      
    setActiveCycleId(null); // remove o ciclo ativo, setando pra null
  }

  const task = watch("task"); //controlled input component
  const isSubmitDisabled = !task;

  return (
    <HomeStyles>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormStyles>
          <label htmlFor="task">Vou trabalhar em: </label>
          <TaskInputStyles
            id="task"
            placeholder="Dê um nome ao seu projeto"
            list="task-suggestions"
            {...register("task")} // register the input, task é o nome que eu dei ao input
            disabled={!!activeCycle} // se o ciclo ativo existir, o input vai ficar desabilitado
          />

          <datalist id="task-suggestions">
            <option value="projeto1" />
            <option value="projeto2" />
          </datalist>

          <label htmlFor="minutesAmount">Durante: </label>
          <TimerInputStyles
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle} // se o ciclo ativo existir, o input vai ficar desabilitado
            {...register("minutesAmount", { valueAsNumber: true })} // register the input, minutesAmount é o nome que eu dei ao input
          />

          <span>minutos.</span>
        </FormStyles>
        <CountDownStyles>
          <span>{minutes[0]}</span>
          <span> {minutes[1]} </span>
          <Separator>:</Separator>
          <span>{seconds[0]} </span>
          <span>{seconds[1]} </span>
        </CountDownStyles>

        {activeCycle ? (
          <StopButtonStyles onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopButtonStyles>
        ) : (
          <StartButtonStyles disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButtonStyles>
        )}
      </form>
    </HomeStyles>
  );
}
