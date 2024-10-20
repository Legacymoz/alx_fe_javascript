const showQuoteButton= document.getElementById('newQuote')
let myQuote=[]
const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Example API URL


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
    populateCategories();
}

function saveQuotes(){
    localStorage.setItem('quotes', JSON.stringify(myQuote))
    
}

async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data.map(item => ({
            text: item.title, // Mapping title to text for simplicity
            category: 'fetched' // Default category for fetched quotes
        }));
    } catch (error) {
        console.error("Failed to fetch quotes:", error);
    }
}

async function postQuote(quote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: quote.text, body: quote.category }),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const newQuote = await response.json();
        return {
            text: newQuote.title,
            category: 'fetched' // Default category for posted quotes
        };
    } catch (error) {
        console.error("Failed to post quote:", error);
    }
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

        const categoryFilter = document.getElementById('categoryFilter');
        const existingCategories = Array.from(categoryFilter.options).map(option => option.value);
        
        // Add the new quote
        myQuote.push({ text: newQuote, category: newCategory });
        saveQuotes();
        
        // Update the dropdown if the new category is not already present
        if (!existingCategories.includes(newCategory)) {
            const newOption = document.createElement('option');
            newOption.value = newCategory;
            newOption.textContent = newCategory;
            categoryFilter.appendChild(newOption);
        }
        
        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
        alert("Quote added!");
        populateCategories();
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
        populateCategories();
    };
    fileReader.readAsText(event.target.files[0]);
}

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(myQuote.map(quote => quote.category))]; // Get unique categories

    // Clear existing options, keeping "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }
}

function filterQuotes() {
    selectedCategory = document.getElementById('categoryFilter').value; // Get selected category

    const displayQuote = document.getElementById('quoteDisplay');

    // Filter quotes based on the selected category
    let filteredQuotes;
    if (selectedCategory === 'all') {
        // If "All Categories" is selected, display all quotes
        filteredQuotes = myQuote;
    } else {
        // Filter quotes by the selected category
        filteredQuotes = myQuote.filter(q => q.category === selectedCategory);
    }

    // Generate the display text for the filtered quotes
    const quotesText = filteredQuotes.map(q => `"${q.text}" - ${q.category}`).join('<br>');
    
    // Update the displayed quotes
    displayQuote.innerHTML = quotesText;

    // Save the last selected category to localStorage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '10px';
    notification.style.right = '10px';
    notification.style.backgroundColor = '#f44336'; // Red color
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.zIndex = '1000';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000); // Remove after 3 seconds
}

function resolveConflicts(fetchedQuotes) {
    fetchedQuotes.forEach(fetchedQuote => {
        const existingQuote = myQuote.find(q => q.text === fetchedQuote.text);
        if (existingQuote) {
            showNotification(`Conflict detected for quote: "${fetchedQuote.text}". Server data will take precedence.`);
            Object.assign(existingQuote, fetchedQuote);
        } else {
            myQuote.push(fetchedQuote);
        }
    });
}

async function syncQuotes() {
    const fetchedQuotes = await fetchQuotesFromServer();
    if (fetchedQuotes) {
        resolveConflicts(fetchedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
    }
}

// Set up periodic sync every 30 seconds
setInterval(syncQuotes, 30000);

// Call the function to create and add the form when the script loads
createAddQuoteForm();

loadQuotes();
showQuoteButton.addEventListener('click',showRandomQuote)
// Attach the export functionality to the HTML export button
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);