import { Play } from "phosphor-react";
import {
  ButtonStyles,
  CountDownStyles,
  FormStyles,
  HomeStyles,
  Separator,
  TaskInputStyles,
  TimerInputStyles,
} from "./HomeStyles";

export function Home() {
  return (
    <HomeStyles>
      <form>
        <FormStyles>
          <label htmlFor="task">Vou trabalhar em: </label>
          <TaskInputStyles
           id="task" 
           placeholder="Dê um nome ao seu projeto" 
            list="task-suggestions"
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

        <ButtonStyles disabled type="submit">
          <Play size={24} />
          Começar
        </ButtonStyles>
      </form>
    </HomeStyles>
  );
}
