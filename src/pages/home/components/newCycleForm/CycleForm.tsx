import { FormStyles, TaskInputStyles, TimerInputStyles } from "./CycleFormStyle";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, "Informe uma tarefa"),
  minutesAmount: zod.number()
  .min(5, 'O tempo mínimo é de 5 minutos').
  max(60, 'O tempo máximo é de 60 minutos'),
});

//interface newCycleFormData {
//task: string;
//minutesAmount: number;
//}

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function CycleForm() {

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  


    return(
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
    )
}