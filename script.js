
/* ------------------------------------------------------------------
   Map  —  Uttarkashi district, Uttarakhand
------------------------------------------------------------------ */
(function initMap() {
    const map = L.map('map', { scrollWheelZoom: false, zoomControl: true })
                 .setView([30.73, 78.45], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    /* Rough outline of Uttarkashi district */
    const uttarkashiBoundary = [
        [31.08, 78.45], [31.02, 78.80], [30.85, 78.98], [30.60, 79.02],
        [30.42, 78.80], [30.40, 78.42], [30.55, 78.10], [30.80, 77.95],
        [31.00, 78.12]
    ];

    const boundaryLayer = L.polygon(uttarkashiBoundary, {
        color: '#3f6350',
        weight: 2,
        fillColor: '#6e8f74',
        fillOpacity: 0.22
    }).addTo(map);

    /* Pilot area (100 ha block near Uttarkashi town) */
    const pilotArea = [
        [30.760, 78.410], [30.760, 78.460], [30.720, 78.460],
        [30.720, 78.410]
    ];
    L.polygon(pilotArea, {
        color: '#96704f',
        weight: 2,
        dashArray: '4 3',
        fillColor: '#b58f6c',
        fillOpacity: 0.35
    }).addTo(map).bindPopup('<strong>Pilot area</strong><br />100 hectares · Uttarkashi');

    L.circleMarker([30.726, 78.435], {
        radius: 5,
        color: '#2f4a3a',
        fillColor: '#2f4a3a',
        fillOpacity: 1,
        weight: 2
    }).addTo(map).bindPopup('Uttarkashi town — field office');

    map.fitBounds(boundaryLayer.getBounds(), { padding: [16, 16] });
})();

/* ------------------------------------------------------------------
   Chart  —  carbon distribution by pool
------------------------------------------------------------------ */
(function initChart() {
    const ctx = document.getElementById('carbonChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Above-ground biomass',
                'Below-ground biomass',
                'Soil organic carbon',
                'Deadwood &amp; litter'
            ],
            datasets: [{
                data: [215, 75, 165, 45],
                backgroundColor: ['#2f4a3a', '#5c7a5f', '#8fa88c', '#c9cfba'],
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '58%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 12,
                        color: '#4a4b44',
                        font: { size: 11, family: 'inherit' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            return item.label + ': ' + item.parsed + ' tCO2e';
                        }
                    }
                }
            }
        }
    });
})();

/* ------------------------------------------------------------------
   Carbon estimator  —  same logic as before (5 tCO2e / ha, $10 per credit)
------------------------------------------------------------------ */
function calculateCarbon() {
    const input   = document.getElementById('hectares');
    const hectares = parseFloat(input.value);
    const result  = document.getElementById('calc-result');

    if (!hectares || hectares <= 0 || isNaN(hectares)) {
        result.textContent = 'Please enter a land area greater than zero.';
        return;
    }

    const credits = Math.round(hectares * 5);
    const revenue = credits * 10;

    document.getElementById('area-display').textContent   = hectares.toLocaleString('en-IN') + ' Hectares';
    document.getElementById('credit-display').textContent = credits.toLocaleString('en-IN') + ' tCO2e';
    document.getElementById('revenue-display').textContent = '$' + revenue.toLocaleString('en-US');

    result.textContent =
        hectares.toLocaleString('en-IN') + ' ha → ' +
        credits.toLocaleString('en-IN') + ' tCO2e → $' +
        revenue.toLocaleString('en-US') + ' at $10 per credit.';
}

/* ------------------------------------------------------------------
   Region label sync (country / state / district selects)
------------------------------------------------------------------ */
function syncRegion() {
    const country  = document.getElementById('country').value;
    const state    = document.getElementById('state').value;
    const district = document.getElementById('district').value;

    document.getElementById('report-region').textContent =
        district + ' District, ' + state + ', ' + country;
}

/* ------------------------------------------------------------------
   PDF report
------------------------------------------------------------------ */
function generatePDF() {
    const element = document.getElementById('dashboard-content');

    const options = {
        margin: 0.4,
        filename: 'Himalayan-Carbon-Labs-Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
}

/* Keep the region label consistent on load */
document.addEventListener('DOMContentLoaded', syncRegion);

