/**
 * @author Mohamed Omar
 * 20/Jan/2020
 */

//  Send fetch request
async function sendApiRequest (url) {
  const sendFetch = await fetch(url)
  const response = await sendFetch.json()
  return response
}

//  Fetch stats from the Chess.com api
async function getChessStats () {
  const stats = await sendApiRequest(
    'https://api.chess.com/pub/player/royalered/stats'
  )
  document.title += ` Stats`
  return stats
}

/*  Immediately invoked function that waits for response from api
 *  after respose it will use chart.js to draw a doughnut chart
 */
;(async () => {
  const stats = await getChessStats()
  const score = stats.chess_blitz.last
  let scoreRecord = Object.values(stats.chess_blitz.record)

  // Array shift left by 1
  scoreRecord = scoreRecord.concat(scoreRecord.splice(0, 1))

  chartStats(scoreRecord)

  scoredDate = new Date(score.date * 1000).toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  let selection = document.getElementById('chess')
  let newArticle = document.createElement('article')
  selection.appendChild(
    newArticle
  ).innerHTML = `<span>Currently ranked: <b>${score.rating}</b> as of ${scoredDate}</span>`
})()

//  Function that renders chart.js
function chartStats (record) {
  var ctx = document.getElementById('scoreChart').getContext('2d')
  var scoreChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [`Loss`, `Draw`, `Win`],
      datasets: [
        {
          data: [...record],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(192, 192, 192, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(75, 192, 192, 1)'
          ]
        }
      ]
    },
    options: {
      legend: {
        reverse: true
      }
    }
  })
}
