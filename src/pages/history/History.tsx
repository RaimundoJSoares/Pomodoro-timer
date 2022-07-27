import { HistoryList, HistoryStyles, Status } from "./HistoryStyles";

export function History() {
  return (
    <HistoryStyles>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Inicio</th>
            <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tarefa </td>
              <td>20 minutos</td>
              <td>Há cerca de 10 dias</td>
              <td>
              <Status statusCollor={"success"}>Concluido</Status>
                 </td>
            </tr>
            <tr>
              <td>Tarefa </td>
              <td>20 minutos</td>
              <td>Há cerca de 10 dias</td>
              <td>
              <Status statusCollor={"success"}>Concluido</Status>
                 </td>
            </tr>
            <tr>
              <td>Tarefa </td>
              <td>20 minutos</td>
              <td>Há cerca de 10 dias</td>
              <td>
              <Status statusCollor={"success"}>Concluido</Status>
                 </td>
            </tr>
            <tr>
              <td>Tarefa </td>
              <td>20 minutos</td>
              <td>Há cerca de 10 dias</td>
              <td>
              <Status statusCollor={"success"}>Concluido</Status>
                 </td>
            </tr>
            <tr>
              <td>Tarefa </td>
              <td>20 minutos</td>
              <td>Há cerca de 10 dias</td>
              <td>
              <Status statusCollor={"success"}>Concluido</Status>
                 </td>
            </tr>
            <tr>
              <td>Tarefa </td>
              <td>20 minutos</td>
              <td>Há cerca de 10 dias</td>
              <td>
              <Status statusCollor={"pending"} >Em andamento</Status>
                 </td>
            </tr>
            <tr>
              <td>Tarefa </td>
              <td>20 minutos</td>
              <td>Há cerca de 10 dias</td>
              <td> 
              <Status statusCollor={"failure"}>Interrompido</Status>
                 </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryStyles>
  )
}
