// Responsável por renderizar o gráfico de evolução do saldo
function renderChart(labels, data) {
  const ctx = document.getElementById('accumulationChart').getContext('2d');
  if (window.accChart) window.accChart.destroy();
  window.accChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Saldo Acumulado',
        data,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: false },
        y: {
          ticks: {
            callback: value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ctx.parsed.y.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
        }
      }
    }
  });
}
