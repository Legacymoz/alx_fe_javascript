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
    displayQuote.innerText=  `" ${quote.text} , ${quote.category}"`

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

showQuoteButton.addEventListener('click',showRandomQuote)