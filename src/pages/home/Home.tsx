import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from "zod";
import {
  ButtonStyles,
  CountDownStyles,
  FormStyles,
  HomeStyles,
  Separator,
  TaskInputStyles,
  TimerInputStyles,
} from "./HomeStyles";
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
 task: zod.string().min(1, 'Informe uma tarefa'),
 minutesAmount : zod.number().min(5).max(60)
})

//interface newCycleFormData {
  //task: string;
  //minutesAmount: number;
//}

type newCycleFormData = zod.infer<typeof  newCycleFormValidationSchema>

interface Cycleprops {
  task: string;
  minutesAmount: number;
  id: string;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycleprops[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>( null)

  const {register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
    task: '',
    minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data : newCycleFormData) {
    const id =  String(new Date().getTime())
    const newCycle : Cycleprops = {

      id,
      task : data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle]) //adiciona o novo ciclo no array de ciclos
    setActiveCycleId(id)

    reset()
  }
  const task  = watch('task') //controlled input component
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
            min={5}
            max={60}
            {...register("minutesAmount", {valueAsNumber:true})} // register the input, minutesAmount é o nome que eu dei ao input
           />

          <span>minutos.</span>
        </FormStyles>
        <CountDownStyles>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownStyles>

        <ButtonStyles disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </ButtonStyles>
      </form>
    </HomeStyles>
  );
}
