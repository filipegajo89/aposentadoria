// Captura o envio do formulário e realiza cálculos
document.getElementById('simulator-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const ageNow = +document.getElementById('ageNow').value;
  const ageRetire = +document.getElementById('ageRetire').value;
  const currentBalance = +document.getElementById('currentBalance').value;
  const desiredIncome = +document.getElementById('desiredIncome').value;
  const preReturn = +document.getElementById('preReturn').value / 100;
  const postReturn = +document.getElementById('postReturn').value / 100;
  const inflation = +document.getElementById('inflation').value / 100;
  const yearsToRetire = ageRetire - ageNow;
  // Cálculo do corpus necessário (renda perpétua)
  const annualIncome = desiredIncome * 12;
  const corpus = annualIncome / (postReturn - inflation);
  // Função PMT mensal
  function pmtMonthly(rateAnnual, years, pv, fv = 0, type = 0) {
    const r = rateAnnual / 12;
    const n = years * 12;
    return (r * (pv * (1 + r) ** n + fv)) / ((1 + r * type) * ((1 + r) ** n - 1)) * -1;
  }
  const pmt = pmtMonthly(preReturn, yearsToRetire, currentBalance, corpus);
  // Atualiza resultados no DOM
  document.getElementById('monthlyContribution').textContent = pmt.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('requiredCorpus').textContent = corpus.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  // Prepara dados para o gráfico
  const labels = [];
  const data = [];
  let balance = currentBalance;
  for (let i = 0; i <= yearsToRetire * 12; i++) {
    labels.push(i);
    data.push(balance);
    balance = balance * (1 + preReturn / 12) + pmt;
  }
  window.renderChart(labels, data);
});
