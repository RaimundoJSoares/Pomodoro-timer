import { useContext } from "react";
import { CycleContext } from "../../contexts/CyclesContext";
import { HistoryList, HistoryStyles, Status } from "./HistoryStyles";
import {formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const {cycles } = useContext(CycleContext)

  return (
    <HistoryStyles>
      <h1>Meu Histórico </h1>
       
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          {cycles.map(cycles => {
            return (
              <tr key={cycles.id} >
                <td>{ cycles.task}</td>
                <td>{cycles.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(cycles.startDate, {
                  addSuffix: true,
                  locale: ptBR
                })}</td>
                <td>
                {cycles.interruptedDate && <Status statusCollor="failure" > Interrompido </Status> }
                {!cycles.finishedDate && !cycles.interruptedDate && <Status statusCollor="pending" > Em Andamento</Status> }
                {cycles.finishedDate && <Status statusCollor="success" > Concluído </Status> }
                </td>
            </tr>
            )
          }  
          )}
          </thead>
        </table>
      </HistoryList>
    </HistoryStyles>
  )
}
