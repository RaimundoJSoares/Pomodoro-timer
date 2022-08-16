import React, { createContext, ReactNode, useReducer, useState } from "react";

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

interface CyclesState {
  cycles: Cycleprops[]; // array de ciclos
  activeCycleId: string | null; // id do ciclo ativo, null pois pode não ter nenhum ciclo ativo
}

export const CycleContext = createContext({} as CycleHistoryProps);

interface CycleContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      if (action.type === "ADD_NEW_CYCLE") {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
      }
      if (action.type === "INTERRUPT_CURRENT_CYCLE") {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            // percorre o array de ciclos
            if (cycle.id === state.activeCycleId) {
              // se o id do ciclo for igual ao id do ciclo ativo
              return { ...cycle, interruptedDate: new Date() }; //retorna todos os dados do ciclo com a informação da data de interrupção
            } else {
              return cycle; // se não, retorna o ciclo sem alterações
            }
          }),
          activeCycleId: null,
        };
      }

      if (action.type === "MARK_CURRENT_CYCLE_AS_FINISHED") {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            // percorre o array de ciclos
            if (cycle.id === state.activeCycleId) {
              // se o id do ciclo for igual ao id do ciclo ativo
              return { ...cycle, finishedDate: new Date() }; //retorna todos os dados do ciclo com a informação da data de interrupção
            } else {
              return cycle; // se não, retorna o ciclo sem alterações
            }
          }),
          activeCycleId: null,
        };
      }

      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  ); // lista de ciclos (cyclo está guadado dentro dessa variavel)

  const { cycles, activeCycleId } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); // quantidade de segundos passados

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); // procura o ciclo ativo no array de ciclos pelo id

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycleprops = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // data atual
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
