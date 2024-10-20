const showQuoteButton= document.getElementById('newQuote')
let myQuote=[]


function loadQuotes(){
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes){
        myQuote = JSON.parse(storedQuotes);
    }
    else{
        myQuote=[ 
            {text: "The only way to do great work is to love what you do.", category: "motivation" },
            { text: "Love is composed of a single soul inhabiting two bodies.", category: "love" },
            { text: "I'm not arguing, I'm just explaining why I'm right.", category: "humor" },
            { text: "Life is what happens when you're busy making other plans.", category: "life" }
        ]
        saveQuotes();
    }
}

function saveQuotes(){
    localStorage.setItem('quotes', JSON.stringify(myQuote))
    
}

function showRandomQuote(){
    let randomIndex = Math.floor(Math.random() * (myQuote.length))
    
    let quote= myQuote[randomIndex];

    const displayQuote= document.getElementById('quoteDisplay');
    displayQuote.innerHTML = `"${quote.text}" <br> - ${quote.category}`;

    sessionStorage.setItem('lastViewed', JSON.stringify(quote))


}

function addQuote()
{
    let newQuote = document.getElementById('newQuoteText').value.trim();
    let newCategory = document.getElementById('newQuoteCategory').value.trim();

    
    if(newQuote && newCategory) {
        myQuote.push({text:newQuote, category: newCategory});
        saveQuotes();
        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
        alert("Quote added!");
    } else {
        alert("Please enter both quote and category.");
    }

;
}
function createAddQuoteForm() {
    // Create a new div element
    let div = document.createElement('div');

    // Create the input elements and button
    let quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    let categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    let button = document.createElement('button');
    button.innerText = 'Add Quote';
    button.onclick = addQuote;

    // Append the inputs and button to the div
    div.appendChild(quoteInput);
    div.appendChild(categoryInput);
    div.appendChild(button);

    // Append the div to the body or any other container
    document.body.appendChild(div);
}

//Function to create an export Button
function createExportBtn() {
    let div = document.createElement('div');
    let exportBtn = document.createElement('button');
    exportBtn.id = "exportQuotes";
    exportBtn.innerText = "Export Quotes";
    exportBtn.addEventListener('click', exportQuotes); // Ensure the button triggers the export function
    div.appendChild(exportBtn);
    document.body.appendChild(div);
}



function exportQuotes() {
    // Convert the quotes array to a JSON string
    const quotesJSON = JSON.stringify(myQuote, null, 2);
    
    // Create a Blob with the JSON string and set its MIME type to application/json
    const blob = new Blob([quotesJSON], { type: "application/json" });
    
    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json"; // Set the file name
    
    // Append the anchor to the document, trigger a click event, and remove the anchor
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Revoke the object URL after use
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        myQuote.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}



// Call the function to create and add the form when the script loads
createAddQuoteForm();
createExportBtn();
loadQuotes();
showQuoteButton.addEventListener('click',showRandomQuote)