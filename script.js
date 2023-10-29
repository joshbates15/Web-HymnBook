// Add event listeners to the calculator-style number pad buttons
document.querySelectorAll('.key').forEach(function(button) {
    button.addEventListener('click', function() {
        var currentInput = document.getElementById('hymnNumber').value;
        var buttonValue = this.textContent;

        if (buttonValue === 'C') {
            // Clear the input field
            document.getElementById('hymnNumber').value = '';
        } else {
            // Append the button value to the input field
            document.getElementById('hymnNumber').value = currentInput + buttonValue;
        }
    });
});

// Add event listener to the Search button
document.getElementById('searchButton').addEventListener('click', function() {
    // Get the hymn number entered by the user
    var hymnNumber = document.getElementById('hymnNumber').value;

    // Call a function to fetch and display hymn verses
    fetchHymnVerses(hymnNumber);
});

// Rest of your JavaScript code remains the same


function fetchHymnVerses(hymnNumber) {
    // Make an AJAX request to load the JSON file containing hymn data
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
    // Find the hymn data with the specified hymn number
    var hymn = hymnData.find(function(item) {
        return item.hymn === hymnNumber;
    });

    // Check if the hymn was found
    if (hymn) {
        var hymnVerses = document.getElementById('hymnVerses');
        hymnVerses.innerHTML = '<h2>' + hymn.hymn + '</h2>';
        
        hymn.verses.forEach(function(verse) {
            hymnVerses.innerHTML += '<p><strong>Verse ' + verse.verse + ':</strong><br>' + verse.text + '</p>';
        });
    } else {
        alert('Hymn not found.');
    }
}
