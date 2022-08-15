import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../contexts/CyclesContext";
import {
  FormStyles,
  TaskInputStyles,
  TimerInputStyles,
} from "./NewCycleFormStyle";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext();

  return (
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
        step={1}
        min={5}
        max={60}
        disabled={!!activeCycle} // se o ciclo ativo existir, o input vai ficar desabilitado
        {...register("minutesAmount", { valueAsNumber: true })} // register the input, minutesAmount é o nome que eu dei ao input
      />

      <span>minutos.</span>
    </FormStyles>
  );
}
