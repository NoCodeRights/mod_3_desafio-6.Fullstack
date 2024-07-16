let data;
let chart;

async function ObtenerDatos(){
    try {
        const res = await fetch('https://mindicador.cl/api/');
        data = await res.json(); //obtenemos valores desde la api y los guardamos
        
    } catch (error) {
        document.querySelector('#resultado').textContent = "Error intentando conectar con el servidor. Por favor intente más tarde.";
    }
}

async function getHistoricalData(moneda) {
    try {
        const response = await fetch(`https://mindicador.cl/api/${moneda}`); //obtenemos el histórico de la moneda que buscamos
        if (!response.ok) {
            throw new Error('Error al obtener los datos históricos');
        }
        const data = await response.json();
        return data.serie.slice(0, 10).reverse(); //le hacemos slice de los últimos 10 y los ponemos en reversa
    } catch (error) {
        document.querySelector('#resultado').innerText = `Error: ${error.message}`;
        return null;
    }
}

async function displayChart(moneda) {
    const historicalData = await getHistoricalData(moneda); //recibimos valores históricos de la función getHistoricalData
    if (!historicalData) return;

    const labels = historicalData.map(item => item.fecha.split('T')[0]);
    const values = historicalData.map(item => item.valor);

    const ctx = document.querySelector('#chart').getContext('2d');

    // Si existe un gráfico anterior, lo destruye
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Historial últimos 10 días (${moneda})`,
                data: values,
                borderColor: 'white',
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointBorderColor: 'white'
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'white' 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' 
                    }
                },
                y: {
                    ticks: {
                        color: 'white' 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

const convertirValor = function(){
    const valor = document.querySelector('#valor').value;
    const moneda = document.querySelector('#moneda').value;

    try {
        const valorConvertido = valor/data[moneda].valor; //hacemos la conversión aquí
    
        document.querySelector('#resultado').textContent = `El valor convertido es: ${valorConvertido.toFixed(2)}`;
        //mostramos el valor convertido en el DOM
    } catch (error) {
        document.querySelector('#resultado').textContent = `Error en la conversión`;
    }

    displayChart(moneda); //mostramos el gráfico

}


ObtenerDatos(); //llamamos a ObtenerDatos para que se cargue una vez al principio cuando cargamos la página