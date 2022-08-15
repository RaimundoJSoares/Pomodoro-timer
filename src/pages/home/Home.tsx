import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { HomeStyles, StartButtonStyles, StopButtonStyles } from "./HomeStyles";
import { useContext} from "react";
import { NewCycleForm } from "./components/newCycleForm/NewCycleForm";
import { Countdown } from "./components/countdown/Countdown";
import { CycleContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe uma tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O tempo precisa ser de no mínimo 5 minutos")
    .max(60),
});

//=interface newCycleFormData {
//task: string;
//minutesAmount: number;
//}

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { createNewCycle, interruptCycle, activeCycle } = useContext(CycleContext)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data);
    reset();}

  const task = watch("task"); //controlled input component
  const isSubmitDisabled = !task;

  return (
    <HomeStyles>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopButtonStyles onClick={interruptCycle} type="button">
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
