url = 'travel_recommendation_api.json';                                                                     // url para utilizacao da API FETCH

                                                                                                            // url for fetch API
                                                          
window.addEventListener('load', function() {                
    page("home");
});                                      
                                                                                                            //variaveis globais utilizadas para tratamento de dados do arquivo JSON         
let messages = [];                      
let countries = [];                                                                                         //global variables for JSON files data
let temples = [];
let beaches = [];
let cities = [];
let all = [];
var cityTime;
var currentDiv;
var buttonName;
let options;
const members = [                                                                                           //Array de objetos dos membros do time 

                                                                                                            //Array of objects for team member 
    
    {
        name:'<br>Gabriel Guerra Samorano Pires',
        description:`Responsible for developing this page.
        The purpose and logic of this project was to use only one 
        page for "all pages" through manipulation of
        DOMs dynamically via javascript, 
        travel_recommendation_html is the only html file in this project. 
        The function of showing the destination timezones in real 
        time was also created dynamically, using asynchronous functions. 
        JSON files were used for data collection and writing via the fetch API.
        Bootstrap and CSS were used for the page layout.<hr>`,
        position:'Team Lead',
        image: './images/Foto.png'
    },
   
];
async function clear() {                                                                                    // funcao assincrona para limpar pesquisa
                                                             
    const parent = document.getElementById("right-col");                                                    //async function to clear search
    while (document.getElementById("rightcol-item")){
    const child = document.getElementById("rightcol-item");
    parent.removeChild(child);
    }
 
    
}


fetch(url)
        .then(response => response.json())
        .then(data => {     
            
            data.countries.forEach(object =>{
                countries.push(object)});
            
            data.countries.forEach(object => {                                                              // divisao dos elementos JSON em arrays de objetos para cada "tipo"  (paises, cidades, praias e templos)           
                cities.push(object.cities)}); 
                                                                                                            //JSON elements divided in arrays of objects for each "type" (countries, cities, beaches and temples
            data.temples.forEach(object => {
                temples.push(object);});

            data.beaches.forEach(object => {
                beaches.push(object);});
          
            cities = cities.flat();
            all = temples.concat(beaches).concat(cities);
            console.log("eu fui chamada");

            all.forEach(element=>{                                                                      // Setando uma nova propriedade para os elementos do JSON nos array de objetos que contem todos os destinos

                if (element.name.includes("Brazil"))                                                        // Setting TimeZones for the JSON elements in the all array witch contains all destinations
                    element["utf"]= "America/Sao_Paulo";              
                else if(element.name.includes("Sydney"))
                    element["utf"]= "Australia/Sydney";
                else if(element.name.includes("Melbourne"))
                    element["utf"]= "Australia/Melbourne";
                else if(element.name.includes("Japan"))
                    element["utf"]= "Asia/Tokyo";
                else if(element.name.includes("India"))       
                    element["utf"]= "Asia/Kolkata";                           
                else if(element.name.includes("Bora"))
                    element["utf"]= "Pacific/Tahiti";
                else if(element.name.includes("Cambodia"))
                    element["utf"]= "Asia/Phnom_Penh";

                })
                //console.log(cities);
            
                
    
        })

/*fetch('timezones.json')                                                                                   //Este codigo usa a API fetch para o arquivo JSON que contem todas as timezones, 
                                                                                                            //converte o formato no array de destinos e encontra seu correspondente horario local. Desabilitado para este projeto.
    .then(response => response.json())              
    .then(timezone => {                                                                                     //This code uses the fetch API for the JSON file that contains all the timezones, 
                                                                                                            //converts the format into the destination array and finds their corresponding local time. Disabled for this project.
    timezone.forEach(object => {
        timezones.push(object.utc);
        timezones.forEach(element=>{
            element.forEach(hora=>{
                
                //timezones_name.push(hora.replace("_"," "));
                //console.log(timezones_name);
                countries.forEach(country =>{
                    //console.log(city.name)
                    if(hora.includes(country.name))
                        country["utf"] = hora;
                    
                        console.log(country);     
                })
                
            })
        })

        
        
    })*/
    
    
function getTime(object){ 
    let button = object.name.concat("-button");    
    document.getElementById(button).classList = 'hidden'; 
                                                                                                                 //Essa funcao assincrona e chamada atraves de um eventListener contido na funcao search  
    setInterval(function() {                                                                                     //encontra o horario local do destino, cria uma nova data e dinamicamente cria um elemento no HTML                                                
    currentTime = object.name.concat("-p");                                                                      //Conta tambem com o uso do metodos setInterval para atualizar esse horario a cada segundo, pode ser usada para diversos destinos ao mesmo tempo                                                                                                                                                                                                                                                                                                                                          
    options = { timeZone: object.utf, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };     
    cityTime = new Date().toLocaleTimeString('en-US', options);                                                  //This asynchronous function is called through an eventListener contained in the search function
    document.getElementById(currentTime).innerHTML=cityTime;                                                     //finds the local time of the destination, creates a new date and dynamically creates an element in the HTML
    console.log("ainda estou ativa");}                                                                           //It also includes the use of setInterval method to update this time every second, it can be used for several destinations at the same time 
    , 1000);                                                                                                
    
                                                                                                  
};







 document.getElementById('search-button').addEventListener('click',search );                                    //EventListeners para os botoes search e clear
 document.getElementById('clear-button').addEventListener('click',clear );
                                                                                                                //EventListenes for search and clear button
 
 


function keySearch(search) {

    
    search.forEach(object => {

        const buttonId = object.name.concat("-button");                                                          //Funcao especifica chamada pela funcao "search" retorna elementos especificos beaseados no input do usuario. Mostra os resultados em formato html
        const currentTime = object.name.concat("-p");
        newDiv = document.createElement("div");                                                                  //Specific function called by the "search" function returns specific elements based on user input, Displays results in html format 
                                                                                
        newDiv.classList = "row";
        newDiv.id = "rightcol-item";
        newDiv.innerHTML = ` 
        <img src="${object.imageUrl}" alt="Image" id="image-result">   
        <h2>${object.name}</h2>
        <p id="${currentTime}"></p>
        <p>${object.description}</p> 
        <button  class="btn btn-outline-success" type="submit"  onclick="showMessage()">Visit</button>
        <button id="${buttonId}" class="btn btn-outline-success" type="submit" > Check Current Time! </button>
        
        `;
        
            
    document.getElementById("right-col").appendChild(newDiv);
    document.getElementById(buttonId).addEventListener('click', (e)=>{              
        getTime(object);   
    })
    
});
    

}




function search(event) {  
                                                                          
    event.preventDefault();
    clear();
    
    let input = document.getElementById("search-input").value;                                                      //manipulação de string para garantir precisão no resultado, flag de variável usada nos casos em que o destino não está cadastrado
    if(input)                                                                                                       //Além desta manipulação, são utilizadas pesquisas, nesta função, métodos para tratar palavras-chave incompletas, singular ou plural, maiúsculas ou minúsculas
    input = input.toString();
    input = input.toLowerCase();                                                                                    //string manipulation to ensure accuracy in the result, variable flag used in cases that destination is not registered
    input = input.replace(/^\s+|\s+$/gm,'');                                                                        //In addition to this manipulation, searches, in this function, methods to treat incomplete keywords, singular or plural, upper or lower case are used
    input = input.trim();
    
    if(input === ""){
        alert(
        "Enter destination or keyword.");
        showKeywords();                                                                                             // Caso Input vazio. Alerta com orientacao de pesquisa e mostrado
        return;
    }                                                                                                               // Case Input empty. Alert with search guidance is shown                                           
                                                 
    console.log("valor de input dentro da function search",input);
    console.log(typeof(input));
    

     if (input.includes("countr")||input.includes("pais")||input.includes("país"))                                  //Dados coletados no arquivo JSON sao colocados em arrays especificos e um adicional contendo todos os dados
        keySearch(cities);
    else if (input.includes("templ"))                                                                               //Data collected in the JSON file is placed in specific arrays and an additional one containing all the data                                                                                                                                                    
        keySearch(temples);                                                                                                                                                                                                   
    else if (input.includes("beach")||input.includes("prai"))
        keySearch(beaches);                                                                                                                                                                                                                    
    else if (input.includes("availa")||input.includes("dispon"))                                             
        keySearch(all);
    else {
        let specificArray = [];
        all.forEach(object => {
            if (object.name.toLowerCase().includes(input)) 
                specificArray.push(object);         
        });
        if (specificArray.length > 0) 
            keySearch(specificArray);
        else{
            alert("Destination not available at this moment");
            showKeywords();
        }
    }                                                                                              
}


             
function page(page){                                                                                                //funcao que cria e insere dinamicamente os dados dos links no arquivo travel-recommendation.html, dispensando o uso do atributo 'href'

    const home = document.getElementById("home");                                                                   //function that dynamically creates and inserts link data into the travel-recommendation.html file, with no use of'href' attribute
    const aboutUs = document.getElementById("about-us");
    const contactUs = document.getElementById("contact-us");
    const rightCol = document.getElementById("right-col");
    const leftCol = document.getElementById("left-col");

    if(page=="home"){
        
        document.getElementById("search-form").classList = "d-flex";
        rightCol.innerHTML = "";
        home.ariaCurrent = "page";
        home.classList = "nav-link active";
        aboutUs.ariaCurrent = "";
        aboutUs.classList = "nav-link"
        contactUs.classList = "nav-link active";
        contactUs.ariaCurrent = "page";
        leftCol.innerHTML = `<h1>EXPLORE DREAM DESTINATION</h1>
        <h3>Discover the world's most breathtaking destinations with our expert travel
        recommendations. Whether you're a nature lover, a culture enthusiast, or a foodie, 
        we've got you covered. Start planning your next adventure today!</h3>
        <button type="submit" class="btn btn-outline-success" id="book-now" onclick ="userMessage()">BOOK NOW</button>`;      
    }

    else if(page=="about-us"){

        document.getElementById("search-form").classList = "hidden";
        rightCol.innerHTML="";
        aboutUs.ariaCurrent = "page";
        aboutUs.classList = "nav-link active"
        contactUs.classList = "nav-link";
        contactUs.ariaCurrent = ""
        home.classList = "nav-link";
        home.ariaCurrent = "";
        leftCol.innerHTML = `<h1>About Us</h1>
        <h3>Welcome to Our company! 
        We are a team of passionate individuals dedicated to providing excellent services/products to our customers. 
        Our mission is to <b>provide the best experience</b> for people travelling to different destinations around 
        the world. Our values include integrity, innovation, customer satisfaction, and teamwork. We believe in <b>
        putting our customers first</b> and <b>working together</b> to achieve our goals.<br>Feel free to explore 
        our website to learn more about what we offer!</h3>
        `;
        for (const member of members) {
            
        
            const rightColItem = document.createElement("Div");
            rightColItem.id = "rightcol-item";
            rightColItem.classList = "row";

            rightColItem.innerHTML += `<img src="${member.image}" alt="Image" id="member-image">`;
            rightColItem.innerHTML += `<h2>${member.name}</h2>`;
            rightColItem.innerHTML += `<p>${member.description}</p>`;
            rightColItem.innerHTML += `<h4>${member.position}</h4>`;
            rightCol.appendChild(rightColItem);   
        }

    }
    
    else{
        
        document.getElementById("search-form").classList = "hidden";
        rightCol.innerHTML="";
        home.classList = "nav-link";
        home.ariaCurrent = "";
        aboutUs.ariaCurrent = "";
        aboutUs.classList = "nav-link"
        contactUs.classList = "nav-link active";
        contactUs.ariaCurrent = "page";    
        leftCol.innerHTML = `<h1>Contact Us</h1>
        <h3>If you have any questions or need assistance, 
        please don't hesitate to contact us. We are here to help you with your
        travel needs and ensure a smooth and enjoyable experience.
        `;

        const rightColItem = document.createElement("Div");
        rightColItem.id = "rightcol-item";
        rightColItem.classList = "row";
        rightColItem.innerHTML = 
        `<form>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" placeholder="Enter your name" class="form-control" id="name" aria-describedby="name" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" placeholder="Enter your email" class="form-control" id="email" aria-describedby="emailHelp" required>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3 textarea">
            <label for="textarea" class="form-label">Message</label>
            <textarea placeholder="Enter your message" class="form-control" id="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-outline-primary" id="form-button" onclick ="userMessage()">Submit</button>
        </form> 
        `;
        rightCol.appendChild(rightColItem);                   
    }
    
}           
 function userMessage(){                                                                                                //Aqui sao colocados os dados do usuario e sua mensagem num array de objetos, e exibe uma mensagem agradecendo o contato, //
    //                                                                                                                  //ha tambem uma funcao que usa a API fetch para armazenar estes dados num arquivo JSON utilizando apenas javascript, tambem desabilitada para o
    const name = document.getElementById("name");                   
    const email = document.getElementById("email");                                                                     //Here the user's data and their message are placed in an array of objects, and displays a message thanking the contact
                                                                                                                        //Function also used the fetch api to write data to a json file, also disabled in this project
    const message = document.getElementById("message")
    const userInfo = {};
    userInfo.name = name;
    userInfo.email = email;
    userInfo.message = message;
    messages.push(userInfo);
    console.log(messages);
    showMessage();
 }  
                                                                                                                        //Funcao que retorna uma mensagem de sucesso, chamada por diversos botoes
 function showMessage(){
                                                                                                                        //Function that returns a success message, called by several buttons
    clear();
    const rightColItem = document.createElement("Div");
    const rightCol = document.getElementById('right-col');
    rightColItem.id = "rightcol-item";
    rightColItem.classList = "row";                                                                          
    rightColItem.innerHTML =    `                                                         
     <h2><center>Thank you for getting in touch</center></h2>
     <hr>                                                   
     <h4><center>Our team will contact you soon</center><h4>
     `;
    rightCol.appendChild(rightColItem);
    
 }
 
 function showKeywords(){                                                                                                       //Funcao chamada para os casos de destino nao cadastrado ou campo de busca vazio
    
    clear();                                                                                                                    //Function called in cases of unregistered destination or empty search field
    const rightColItem = document.createElement("Div");                                                                         
    const rightCol = document.getElementById('right-col');
    rightColItem.id = "rightcol-item";
    rightColItem.classList = "row";                                                                          
    rightColItem.innerHTML = `                                                         
    <h2><center>Keywords (palavras-chave)</center></h2>
    <hr>
    <ul>
    <li>Location name.</li>
    <li>"Available" to display all available destination currently available.</li>
    <li>"Beach" to display all available beaches currently available.</li>
    <li>"Temple" to display all available temples currently available.</li>
    <li>"Country" to display all available countries and their cities currently available.</li> 
    </ul>
    <hr>
    <ul>                                                   
    <li> Nome do destino
    <li>"Disponível" para mostrar todas os destinos disponiveis no momento.</li>
    <li>"Praia" para mostrar todas as praias disponiveis no momento.</li>
    <li>"Templo" para mostrar todos os templos disponiveis no momento.</li>
    <li>"País"  para mostrar todos as paises disponiveis no momento.</li>
    
    </ul>
    
    `;
    rightCol.appendChild(rightColItem);

}
                                                                                                                        
      
    
           
