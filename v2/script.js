// Add event listeners to the keypad buttons
document.querySelectorAll('.key').forEach(function(button) {
    button.addEventListener('click', function() {
        var currentInput = document.getElementById('hymnNumber').value;
        var buttonValue = this.textContent;

        if (buttonValue === 'X') {
            document.getElementById('hymnNumber').value = '';
        } else {
            // Limit to 4 digits for safety
            if(currentInput.length < 4) {
                document.getElementById('hymnNumber').value = currentInput + buttonValue;
            }
        }
    });
});

document.getElementById('searchButton').addEventListener('click', function() {
    var hymnNumber = document.getElementById('hymnNumber').value;
    if (!hymnNumber) return;
    fetchHymnVerses(hymnNumber);
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('hymnNumber').value = '';
    togglePageVisibility('number-input-page', 'hymn-display-page');
});

function togglePageVisibility(showPage, hidePage) {
    const title = document.getElementById('mainTitle');
    
    if (showPage === 'hymn-display-page') {
        // Shrink the title when viewing a hymn
        title.classList.remove('text-4xl', 'py-2');
        title.classList.add('text-sm', 'py-1');
    } else {
        // Grow the title back when on the keypad
        title.classList.remove('text-sm', 'py-1');
        title.classList.add('text-4xl', 'py-2');
    }
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
        }
    };
    xhr.send();
}

function displayHymnVerses(hymnNumber, hymnData) {
    var hymn = hymnData.find(item => item.hymn === hymnNumber);
    
    if (hymn) {
        togglePageVisibility('hymn-display-page', 'number-input-page');
        document.getElementById('hymn-number-wrap').innerText = 'Hymn ' + hymn.hymn;
        var container = document.getElementById('hymnVerses');
        container.innerHTML = '';
        
        hymn.verses.forEach(function(verse) {
            var formattedText = verse.text.replace(/\n/g, "<br>");
            container.innerHTML += `
                <div class="verse-card">
                    <div class="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Verse ${verse.verse}</div>
                    <div class="hymn-text">${formattedText}</div>
                </div>`;
        });
        // Scroll to top of display page
        document.querySelector('.hymn-display-page').scrollTop = 0;
    } else {
        alert('Hymn #' + hymnNumber + ' not found.');
        document.getElementById('hymnNumber').value = '';
    }
}
