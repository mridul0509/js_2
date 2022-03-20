var cpu_data;
var disk_data;


var disk_perf = [90, 10, 20, 50, 0, 70]
let cpu_perf;
let time;

let myChart;
let myChartCPU;

var xmlhttp = new XMLHttpRequest();
var url = "http://127.0.0.1:5500/cpu_usage.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 304)){
        handle_cpu_usage(xmlhttp.responseText);
    }
}

var xmlhttp2 = new XMLHttpRequest();
var url = "http://127.0.0.1:5500/disk_usage.json";
xmlhttp2.open("GET", url, true);
xmlhttp2.send();
xmlhttp2.onreadystatechange=function() {
    if (xmlhttp2.readyState == 4 && (xmlhttp2.status == 200 || xmlhttp2.status == 304)){
        handle_disk_usage(xmlhttp2.responseText);
    }
}



function handle_cpu_usage(response) {
        cpu_data = JSON.parse(response);
        //console.log(data);
        time = cpu_data.data.map(function(elem){
            return elem.time;
        });
        //console.log(time);
        cpu_perf = cpu_data.data.map(function(elem){
            return elem.perf;
        });

        update_chart();
}

function handle_disk_usage(response) {
        disk_data = JSON.parse(response);
        disk_perf = disk_data.data.map(function(elem){
            return elem.usage;
        });

        update_chart2();
}

function update_chart(){
    const ctx = document.getElementById('canvas');
    const myChartCPU = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,   
            datasets: [{
                label: 'cpu perf',
                data: cpu_perf,
                backgroundColor: 'transparent',
                borderColor: 'red',
                borderWidth: 4
            }
        ]
        },
        options: {
            elements:{
                line:{
                    tension:0
                }
            },
            scales: {
                y: {
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    ctx.onclick = clickHandlerCPU; 

}

function update_chart2(){
    const ctx = document.getElementById('canvas2');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,   
            datasets: [{
                label: 'disk perf',
                data: disk_perf,
                backgroundColor: 'transparent',
                borderColor: 'blue',
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
                y: {
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
    ctx.onclick = clickHandlerDisk; 

}

function clickHandlerDisk(click){
    console.log('clicked');
    const points = myChart.getElementsAtEventForMode(click, 'nearest',
        { intersect:true }, true);

        if(points.length){
            const firstPoint  = points[0];
            console.log(points);
        }
}

function clickHandlerCPU(click){
    console.log('clicked');
    const points = myChart.getElementsAtEventForMode(click, 'nearest',
        { intersect:true }, true);

        if(points.length){
            const firstPoint  = points[0];
            
            console.log(cpu_data.data[firstPoint.index].processes);
        }
}
