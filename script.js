let chartData = [];
let chartInstance = null;

function goToStep2() {
  const title = document.getElementById("chartTitle").value;
  if (!title) return alert("Por favor ingresa un nombre para la tabla.");
  document.getElementById("chartTitleDisplay").innerText = title;
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

function addData() {
  const name = document.getElementById("dataName").value;
  const value = parseFloat(document.getElementById("dataValue").value);
  const date = document.getElementById("dataDate").value;

  if (!name || isNaN(value) || !date) {
    return alert("Por favor completa todos los campos.");
  }

  chartData.push({ name, value, date });
  document.getElementById("dataList").innerText = JSON.stringify(chartData, null, 2);
  
   document.getElementById("dataName").value = "";
  document.getElementById("dataValue").value = "";
  document.getElementById("dataDate").value = "";
}

function generateChart() {
  const chartType = document.getElementById("chartType").value;
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  const labels = chartData.map(item => item.name + " (" + item.date + ")");
  const values = chartData.map(item => item.value);

  if (chartInstance) chartInstance.destroy();

  const colors = [
    '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#2ecc71', '#f39c12', '#1abc9c', '#8e44ad'
  ];

  let type = chartType === 'pictogram' ? 'bar' : chartType;
  const isHorizontal = chartType === 'pictogram';

  chartInstance = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: 'Datos',
        data: values,
        backgroundColor: chartType === 'pie' ? colors : colors.slice(0, values.length)
      }]
    },
    options: {
      indexAxis: isHorizontal ? 'y' : 'x', 
      plugins: {
        legend: {
          display: chartType !== 'bar' || isHorizontal 
        }
      },
      responsive: true
    }
  });
}

function restart() {
  chartData = [];
  if (chartInstance) chartInstance.destroy();
  document.getElementById("chartTitle").value = "";
  document.getElementById("dataList").innerText = "";
  document.getElementById("step1").style.display = "block";
  document.getElementById("step2").style.display = "none";
}
