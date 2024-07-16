let data;

async function ObtenerDatos(){
    try {
        const res = await fetch('https://mindicador.cl/api/');
        data = await res.json();
        
    } catch (error) {
        document.querySelector('#resultado').textContent = "Error intentando conectar con el servidor. Por favor intente más tarde";
    }
}

const convertirValor = function(){
    const valor = document.querySelector('#valor').value;
    const moneda = document.querySelector('#moneda').value;

    try {
        const valorConvertido = valor/data[moneda].valor;
    
        document.querySelector('#resultado').textContent = `El valor convertido es: ${valorConvertido.toFixed(2)}`;
        
    } catch (error) {
        document.querySelector('#resultado').textContent = `Error en la conversión`;
    }

}

ObtenerDatos();