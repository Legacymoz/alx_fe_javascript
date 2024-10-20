const showQuoteButton= document.getElementById('newQuote')
let myQuote=[ 
    {text: "The only way to do great work is to love what you do.", category: "motivation" },
    { text: "Love is composed of a single soul inhabiting two bodies.", category: "love" },
    { text: "I'm not arguing, I'm just explaining why I'm right.", category: "humor" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" }
]

function showRandomQuote(){
    let randomIndex = Math.floor(Math.random() * (myQuote.length))
    
    let quote= myQuote[randomIndex];

    const displayQuote= document.getElementById('quoteDisplay');
    displayQuote.innerHTML = `"${quote.text}" <br> - ${quote.category}`;


}

function addQuote()
{
    let newQuote = document.getElementById('newQuoteText').value.trim();
    let newCategory = document.getElementById('newQuoteCategory').value.trim();

    
    if(newQuote && newCategory) {
        myQuote.push({text:newQuote, category: newCategory});
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

// Call the function to create and add the form when the script loads
createAddQuoteForm();

showQuoteButton.addEventListener('click',showRandomQuote)