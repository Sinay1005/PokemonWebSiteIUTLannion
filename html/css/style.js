function changeHeaderText() {
    document.querySelector('th[label="ID"]').textContent = "ID";
    document.querySelector('th[label="NOM"]').textContent = "Nom";
    document.querySelector('th[label="GEN"]').textContent = "Gen";
    document.querySelector('th[label="TYPES"]').textContent = "Types";
    document.querySelector('th[label="STATS"]').textContent = "Statistiques";

    document.querySelector('th[label="STATS"]').style.display = "table-cell";
    document.querySelectorAll('td[label="STATS"]').forEach(td => {
        td.style.display = "table-cell";
    });

    document.querySelectorAll('th[label="ENDURANCE"], th[label="PTSA"], th[label="PTSD"]').forEach(th => {
        th.style.display = "none";
    });

    document.querySelectorAll('td[label="ENDURANCE"], td[label="PTSA"], td[label="PTSD"]').forEach(td => {
        td.style.display = "none";
    });
}

function resetHeaderText() {
    document.querySelector('th[label="ID"]').textContent = "Identifiant unique";
    document.querySelector('th[label="NOM"]').textContent = "Nom";
    document.querySelector('th[label="GEN"]').textContent = "Génération";
    document.querySelector('th[label="TYPES"]').textContent = "Types";
    document.querySelector('th[label="STATS"]').textContent = "Statistiques";

    document.querySelectorAll('th[label="ENDURANCE"], th[label="PTSA"], th[label="PTSD"]').forEach(th => {
        th.style.display = "table-cell";
    });

    document.querySelectorAll('td[label="ENDURANCE"], td[label="PTSA"], td[label="PTSD"]').forEach(td => {
        td.style.display = "table-cell";
    });

    document.querySelector('th[label="STATS"]').style.display = "none";

    document.querySelectorAll('td[label="STATS"]').forEach(td => {
        td.style.display = "none";
    });
}


function handleScreenSizeChange(event) {
    if (event.matches) {
        changeHeaderText();
    } else {
        resetHeaderText();
    }
}

const mediaQuery = window.matchMedia('(max-width: 800px)');
mediaQuery.addEventListener('change', handleScreenSizeChange);
handleScreenSizeChange(mediaQuery);

export { handleScreenSizeChange }