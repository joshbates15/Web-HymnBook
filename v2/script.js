// Add event listeners to the keypad buttons
document.querySelectorAll('.key').forEach(function(button) {
    button.addEventListener('click', function() {
        var currentInput = document.getElementById('hymnNumber').value;
        var buttonValue = this.textContent;

        if (buttonValue === 'X') {
            document.getElementById('hymnNumber').value = '';
        } else {
            document.getElementById('hymnNumber').value = currentInput + buttonValue;
        }
    });
});

document.getElementById('searchButton').addEventListener('click', function() {
    var hymnNumber = document.getElementById('hymnNumber').value;
    if (!hymnNumber) return;

    fetchHymnVerses(hymnNumber);
    togglePageVisibility('hymn-display-page', 'number-input-page');
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('hymnNumber').value = '';
    togglePageVisibility('number-input-page', 'hymn-display-page');
    document.getElementById('hymnVerses').innerHTML = '';
});

function togglePageVisibility(showPage, hidePage) {
    document.querySelector('.' + showPage).classList.remove('hidden');
    document.querySelector('.' + hidePage).classList.add('hidden');
}

function fetchHymnVerses(hymnNumber) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'hymns.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var hymnData = JSON.parse(xhr.responseText);
            displayHymnVerses(hymnNumber, hymnData);
        } else {
            alert('Failed to load hymn data.');
        }
    };
    xhr.send();
}

function displayHymnVerses(hymnNumber, hymnData) {
    var hymn = hymnData.find(item => item.hymn === hymnNumber);
    var hymnVerses = document.getElementById('hymnVerses');
    var hymnTitle = document.getElementById('hymn-number-wrap');

    if (hymn) {
        hymnTitle.innerHTML = 'Hymn ' + hymn.hymn;
        hymnVerses.innerHTML = '';
        
        hymn.verses.forEach(function(verse) {
            var formattedVerse = verse.text.replace(/\n/g, "<br>");
            // Using DaisyUI Card component for verses
            hymnVerses.innerHTML += `
                <div class="card bg-base-100 shadow-sm border border-base-300">
                    <div class="card-body p-6">
                        <h3 class="card-title text-sm uppercase text-gray-400">Verse ${verse.verse}</h3>
                        <p class="text-lg leading-relaxed">${formattedVerse}</p>
                    </div>
                </div>`;
        });
    } else {
        alert('Hymn not found.');
        togglePageVisibility('number-input-page', 'hymn-display-page');
    }
}