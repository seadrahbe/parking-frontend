window.onload = () => {
    const button = document.querySelector("#load-button");
    button.onclick = loadRecordsFetch;

    const form = document.querySelector("#parking-form");
    form.onsubmit = handleFormAxios;
}

async function handleFormAxios() {
    event.preventDefault();

    try {
        const inputs = readFormEntries();
        const url = "http://localhost:8001/api/fake/campus/parkingSpots";
        const response = await axios.post(url, inputs);
    } catch(err) {
        showError(err.message, err.status);
    }
}

async function handleFormFetch() {
    event.preventDefault(); // stops page refresh

    try {
        const inputs = readFormEntries();
        const url = "http://localhost:8001/api/fake/campus/parkingSpots";
        const config = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        }

        const response = await fetch(url, config);
    } catch(err) {
        console.log(err);
    }
}

async function loadRecordsAxios() {
    try {
        const url = "http://localhost:8001/api/fake/campus/parkingSpots";
        const response = await axios.get(url, { timeout: 5000 });

        hideError();
        showRecords(response.data);
    } catch(err) {
        showError(err.status, err.message);
    }

}

async function loadRecordsFetch() {
    try {
        const url = "http://localhost:8001/api/fake/campus/parkingSpots?status=500";
        const config = { method: "get" };
        const response = await fetch(uri, config);
        if (!response.ok) return showError(response.statusText, response.status);
        else hideError();

        const records = await response.json();
        showRecords(records);

    } catch (err) {
        console.log(err); 
        console.log("Network failure!");
    }
}

function showRecords(records) {
    const recordsArea = document.querySelector("#records");
    recordsArea.innerHTML = ''; // remove all content in panel

    // add records to panel
    for (const record of records.data) {
        const html = getParkingSpotCard(record);
        recordsArea.innerHTML = html;
    }
}

function readFormEntries() {
    return {
        lot: document.querySelector("#lot-input").value,
        spotNumber: document.querySelector("#spot-input").value,
        status: document.querySelector("#status-input").value,
        note: document.querySelector("#note-input").value,
    }
}

function getParkingSpotCard(spot) {
    const { id, lot, spotNumber, status, note } = spot;

    return `
        <article class="record-card">
            <ul class="record-card-list">
                <li class="record-card-row">
                    <span class="record-card-label">id</span>
                    <span class="record-card-value">${id}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">lot</span>
                    <span class="record-card-value">${lot}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">spotNumber</span>
                    <span class="record-card-value">${spotNumber}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">status</span>
                    <span class="record-card-value">${status}</span>
                </li>

                <li class="record-card-row">
                    <span class="record-card-label">note</span>
                    <span class="record-card-value">${note}</span>
                </li>
            </ul>
        </article>
    `;
}

function showError(code, message) {
    const el = document.querySelector("#error-box");

    if (code) el.textContent = `Status: ${code}, Message: ${message}`;
    else el.textContent = `Message: ${message}`;
    
    el.hidden = false;
};

function hideError() {
    const el = document.querySelector("#error-box");
    el.hidden = true;
}