let data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
        {
            label: "My First dataset",
            //linia
            //borderDash: [3, 3], //jezeli ustawione to przerywana linia
            borderColor : 'rgba(236,115,87, 0.7)',
            pointBorderColor : 'rgba(236,115,87, 0.7)',
            borderWidth : 2,
            //kolor tla i legendy
            fill: true, //czy wypelnic zbior
            backgroundColor : 'rgba(236,115,87, 0.1)', //wplywa tez na kolor w legendzie
            //ustawienia punktu
            pointRadius : 4,
            pointBorderWidth : 1,
            pointBackgroundColor : 'rgba(255,255,255,1)',
            //ustawienia punktu hover
            pointHoverRadius: 4,
            pointHoverBorderWidth: 3,
            pointHoverBackgroundColor : 'rgba(255,255,255,1)',
            pointHoverBorderColor : 'rgba(236,115,87, 1)',
            data: [50, 30, 40, 30, 32, 25, 30],
        },
        {
            label: "My Second dataset",
            borderColor : 'rgba(75,192,192, 0.7)',
            ...
            data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
            label: "My Third dataset",
            borderColor : 'rgba(132,177,237, 0.7)',
            ...
            data: [30, 20, 60, 50, 42, 15, 40],
        }
    ]
};

let options = {
};

let ctx = document.getElementById("myChart").getContext("2d");;
let myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});