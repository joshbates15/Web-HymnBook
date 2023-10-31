// Add event listeners to the calculator-style number pad buttons
document.querySelectorAll('.key').forEach(function(button) {
    button.addEventListener('click', function() {
        var currentInput = document.getElementById('hymnNumber').value;
        var buttonValue = this.textContent;

        if (buttonValue === 'X') {
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

    // Toggle visibility
    togglePageVisibility('hymn-display-page', 'number-input-page')
});

// Add event listener to the Back button
document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('hymnNumber').value = '';
    // Toggle visibility to return to the number input page
    togglePageVisibility('number-input-page', 'hymn-display-page');
    // Reset the hymn verses div.
    document.getElementById('hymnVerses').innerHTML = '&nbsp;';
});

// Function to toggle page visibility
function togglePageVisibility(showPage, hidePage) {
    document.querySelector('.' + showPage).style.display = 'block';
    document.querySelector('.' + hidePage).style.display = 'none';
}


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
        var hymnVerseNum = document.getElementById('hymn-number-wrap');
        hymnVerseNum.innerHTML = '<h2>HYMN: ' + hymn.hymn + '</h2>';
        var hymnVerses = document.getElementById('hymnVerses');
        hymn.verses.forEach(function(verse) {
            var formattedVerse = verse.text.replace(/\n/g, "<br>");
            hymnVerses.innerHTML += '<p><strong>Verse ' + verse.verse + ':</strong><br><span class="hymn-text">' + formattedVerse + '</span></p>';
        });
    } else {
        alert('Hymn not found.');
    }
}
