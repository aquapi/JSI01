let chart;

/**
 * @param {string} contryCode 
 * @returns {any} fetched data
 */
const loadData = async (contryCode) =>
    await fetch("https://covid-19-data.p.rapidapi.com/country/code?code=" + encodeURIComponent(contryCode.toLowerCase()), {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "de6fb8dc94msh4515a1eac961acap188af5jsn10d1722ec056"
        }
    }).then(res => res.json());

const render = (deaths, recovered) => {
    if (chart) chart.destroy();
    chart = new Chart(document.querySelector("canvas").getContext("2d"), {
        type: 'bar',
        data: {
            labels: ["Deaths", "Recovered"],
            datasets: [
                {
                    label: 'Deaths and Recovered',
                    data: [deaths, recovered],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                    ]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                }
            }
        },
    });
}

const main = async () => {
    render(0, 0);
    const input = document.querySelector("input");
    input.addEventListener("keyup", async () => {
        if (input.value.length === 2) {
            input.readOnly = true;
            const val = input.value;
            input.value = "";
            input.placeholder = "Finding...";
            setTimeout(() => {
                input.readOnly = false;
                input.placeholder = "Enter a country code";
                input.value = val;
            }, 2000);
            const data = await loadData(val.substring(0, 2));
            render(data[0].deaths ? data[0].deaths : 0, data[0].recovered ? data[0].recovered : 0);
        } else if (input.value.length > 2)
            input.value = input.value.substring(0, 2)
    })
}

main();