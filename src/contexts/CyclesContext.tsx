import React, { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycleprops {
    task: string; // tarefa dada pelo usuário
    minutesAmount: number; // tempo em minutos
    id: string; // representa o id do ciclo, cada ciclo precisa ter um id (que vai funciona como identificador historico)
    startDate: Date; // data que ele começou
    interruptedDate?: Date; // data que ele foi interrompido (se for interrompido pois é opctional)
    finishedDate?: Date; // data que ele foi finalizado (se for finalizado pois é opctional)
}
interface CycleHistoryProps {
    cycles: Cycleprops[]; // array de ciclos
    activeCycle: Cycleprops | undefined; // ciclo ativo, undefined pois pode não ter nenhum ciclo ativo
    activeCycleId: string | null; // id do ciclo ativo, null pois pode não ter nenhum ciclo ativo
    markCurrentCycleAsFinished: () => void; // função que marca o ciclo atual como finalizado
    amountSecondsPassed: number; // quantidade de segundos passados
    setSecondsPassed: (seconds: number) => void; // função que seta a quantidade de segundos passados
    createNewCycle: (data: CreateCycleData) => void; // função que cria um novo ciclo
    interruptCycle: () => void; // função que interrompe um ciclo
}


export const CycleContext = createContext({} as CycleHistoryProps);

interface CycleContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider( {children} : CycleContextProviderProps)    {

    const [cycles, setCycles] = useState<Cycleprops[]>([]); // lista de ciclos (cyclo está guadado dentro dessa variavel)
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); // procura o ciclo ativo no array de ciclos pelo id
    
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
      }

      function markCurrentCycleAsFinished() {
        // função que marca o ciclo atual como finalizado
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
      }

      function createNewCycle(data: CreateCycleData) {
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
    
      }
    
      function interruptCycle() {
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

    return(
        <CycleContext.Provider
        value={{
          activeCycle,
          activeCycleId,
          markCurrentCycleAsFinished,
          amountSecondsPassed,
          setSecondsPassed,
          createNewCycle,
          interruptCycle,
          cycles
        } 
      }
      >
          {children}
        </CycleContext.Provider>
    )
}