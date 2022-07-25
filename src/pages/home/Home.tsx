import { Play } from "phosphor-react";
import { CountDownStyles, FormStyles, HomeStyles, Separator } from "./HomeStyles";

export function Home() {
  return (
    <HomeStyles>
      <form>
        <FormStyles>
          <label htmlFor="task">Vou trabalhar em: </label>
          <input id="task" />

          <label htmlFor="minutesAmount">Durante: </label>
          <input id="minutesAmount" type="number"/>

          <span>minutos.</span>
        </FormStyles>
        <CountDownStyles>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownStyles>

      <button type="submit">
        <Play size={24}/>
        Começar
        </button>
      </form>
    </HomeStyles>
  )
}
