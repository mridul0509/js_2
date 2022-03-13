var cpu_data;
var time;
var disk_data;

var xmlhttp = new XMLHttpRequest();
var url = "http://127.0.0.1:5500/cpu_usage.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && (this.status == 200 || this.status == 304)){
        var data = JSON.parse(this.responseText);
        //console.log(data);
        var time = data.data.map(function(elem){
            return elem.time;
        });
        //console.log(time);
        var perf = data.data.map(function(elem){
            return elem.perf;
        });

        const ctx = document.getElementById('canvas').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'cpu perf',
                    data: perf,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 4
                },
                {
                    label: 'disk perf',
                    data: perf,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 4
                }]
            },
            options: {
                elements:{
                    line:{
                        tension:0
                    }
                },
                scales: {
                    yAxes: [{
                        ticks:{
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        const ctx2 = document.getElementById('canvas2').getContext('2d');
        const myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'cpu perf',
                    data: perf,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 4
                },
                {
                    label: 'disk perf',
                    data: perf,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 4
                }]
            },
            options: {
                elements:{
                    line:{
                        tension:0
                    }
                },
                scales: {
                    yAxes: [{
                        ticks:{
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }
}
