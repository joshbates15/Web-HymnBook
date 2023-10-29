document.getElementById('searchButton').addEventListener('click', function() {
    // Get the hymn number entered by the user
    var hymnNumber = document.getElementById('hymnNumber').value;

    // Call a function to fetch and display hymn verses
    fetchHymnVerses(hymnNumber);
});

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
