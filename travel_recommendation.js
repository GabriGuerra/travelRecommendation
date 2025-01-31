url = 'travel_recommendation_api.json';

let messages = [];
let countries = [];
let temples = [];
let beaches = [];
let cities = [];
let all = [];
let flag = false;

const members = [
    {
        name: 'Guerra',
        description: 'Responsable for the development of the website...',
        position: 'CEO',
        image: './images/Foto.png'
    },
    {
        name: 'Samorano',
        description: 'Responsable for the development of the website...',
        position: 'Team Lead',
        image: './images/Foto.png'
    },
    {
        name: 'Pires',
        description: 'Responsable for the development of the website...',
        position: 'Delivery Head',
        image: './images/Foto.png'
    }
];

 async function clear() {
                                                                     // funcao assincrona para limpar pesquisa
    const parent = document.getElementById("specific-content");
    while (document.getElementById("results-item")){
    const child = document.getElementById("results-item");
    parent.removeChild(child);
    }
    
}
fetch(url)
        .then(response => response.json())
        .then(data => {     
            
            
            data.countries.forEach(object => {              // divisao dos elementos JSON em arrays de objetos
                countries.push(object.cities)});
            data.temples.forEach(object => {
                temples.push(object);});
            data.beaches.forEach(object => {
                beaches.push(object);});
                cities = countries.flat();
            all = temples.concat(beaches).concat(cities);
            console.log("eu fui chamada");
            
            
    
    })

 document.getElementById('search-button').addEventListener('click',search );
 document.getElementById('clear-button').addEventListener('click',clear );

function search(event) {
    event.preventDefault();
  
    clear();   //funcao async para limpar pesquisa caso usuario nao tenha pressionado botao clear


    let search = document.getElementById("search-input").value;
    if (search === "") {
        alert("Please, type a destination or keyword: (\"beach\", \"country\" or \"temple\")");
    return;
    };
        
    
    flag = false;                             //tratamento do valor inserido pelo usuario na pesquisa
    search = search.toLowerCase();
    search= search.replace(/^\s+|\s+$/gm,'');
    search =search.trim();
    
    
        if (search.includes("countr")){   // retorna todos os dados
                flag = true;
                all.forEach(object => {
                newDiv = document.createElement("div");
                newDiv.classList = "row";
                newDiv.id = "results-item";
                newDiv.innerHTML = `
                <img src="${object.imageUrl}" alt="Image" id="image-result">    
                <h2>${object.name}</h2>
                <p>${object.description}</p> 
                <button class="btn btn-outline-success" type="submit">Visit</button>
                `;
                document.getElementById("specific-content").appendChild(newDiv);
            });
            
            
        }

        else if (search.includes("templ")){ //retorna todos os templos
                flag = true;
                temples.forEach(object => {
                newDiv = document.createElement("div");
                newDiv.classList = "row";
                newDiv.id = "results-item";
                newDiv.innerHTML = `
                <img src="${object.imageUrl}" alt="Image" id="image-result">    
                <h2>${object.name}</h2>
                <p>${object.description}</p> 
                <button class="btn btn-outline-success" type="submit">Visit</button>
                `;
                document.getElementById("specific-content").appendChild(newDiv);
            });
        }
        
        else if (search.includes("beach")){
                flag = true; //retorna todas as praias
                beaches.forEach(object => {
                newDiv = document.createElement("div");
                newDiv.classList = "row";
                newDiv.id = "results-item";
                newDiv.innerHTML = `
                <img src="${object.imageUrl}" alt="Image" id="image-result">    
                <h2>${object.name}</h2>
                <p>${object.description}</p> 
                <button class="btn btn-outline-success" type="submit">Visit</button>
                `;
                document.getElementById("specific-content").appendChild(newDiv);
            });
        }
        
        else all.forEach(object => {
            console.log(object.name.toLowerCase().normalize("NFD")) // retorna elemento especifico pelo nome ou alerta no caso de nao encontrar elemento                                     
            if (object.name.toLowerCase().includes(search)){
                flag = true;
                newDiv = document.createElement("div");
                newDiv.classList = "row";
                newDiv.id = "results-item";
                newDiv.innerHTML = `
                <img src="${object.imageUrl}" alt="Image" id="image-result">    
                <h2>${object.name}</h2>
                <p>${object.description}</p> 
                <button class="btn btn-outline-success" type="submit">Visit</button>
                `;
                document.getElementById("specific-content").appendChild(newDiv);}
                
            });
            if (!flag)  alert("Destination not available at this moment, type \"country\" to display all");
              

};
    


function home() {
    document.location.href = './travel_recomendations.html';
};

function aboutUs() {

    
    document.getElementById("search-form").classList = "hidden";
    document.getElementById("clear-button").classList = "hidden";
    const home = document.getElementById("Home");
    home.ariaCurrent = "";
    home.classList = "nav-link";
    const contactUs = document.getElementById("Contact-Us");
    contactUs.classList = "nav-link";
    contactUs.ariaCurrent = "";
    const aboutus = document.getElementById("About-Us");
    aboutus.ariaCurrent = "page";
    aboutus.classList = "nav-link active";


    document.getElementById("title").innerHTML = "About Us";
    document.getElementById("description").innerHTML = "Welcome to Our company! We are a team of passionate individuals dedicated to providing excellent services/products to our customers. Our mission is to <b>provide the best experience</b> for people travelling to different destinations around the world. Our values include integrity, innovation, customer satisfaction, and teamwork. We believe in <b>putting our customers first</b>and<b>working together</b> to achieve our goals.<br>Feel free to explore our website to learn more about what we offer!";
    
    const specificContent = document.getElementById("specific-content");
    specificContent.innerHTML = "";
    
    
    for (const member of members) {
    const newDiv = document.createElement("div");
    newDiv.classList = "row";
    newDiv.id = "Team-Members";
    const name = member.name;
    const description = member.description;
    const position = member.position;
    const image = member.image;
    newDiv.innerHTML = `
    <h2><img src="${image}" alt="Image" id="image">${name}</h2> 
    
    <p><em>${description}</em></p>
    <p><span id="position">${position}</span></p>
    
`;
    specificContent.appendChild(newDiv);
    
    };

};


function contactUs() {
    

    document.getElementById("search-form").classList = "hidden";
    document.getElementById("clear-button").classList = "hidden";
    const home = document.getElementById("Home");
    home.ariaCurrent = "";
    home.classList = "nav-link";
    const contactUs = document.getElementById("Contact-Us");
    contactUs.classList = "nav-link active";
    contactUs.ariaCurrent = "";
    const aboutus = document.getElementById("About-Us");
    aboutus.ariaCurrent = "page";
    aboutus.classList = "nav-link";



    
    document.getElementById("title").innerHTML = "Contact Us";
    document.getElementById("description").innerHTML = "If you have any questions or need assistance, please don't hesitate to contact us. We are here to help you with your travel needs and ensure a smooth and enjoyable experience.";

    
    
    document.getElementById("specific-content").innerHTML = `
    <form>
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
    <button type="submit" class="btn btn-primary" id="form-button" onclick ="userMessage()">Submit</button>
    </form> 
    `;   
}


 function userMessage(){
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message")
    const userInfo = {};
    userInfo.name = name;
    userInfo.email = email;
    userInfo.message = message;
    messages.push(userInfo);
    console.log(messages);
    document.getElementById("specific-content").innerHTML = `<div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Thank you for getting in touch</h4>
        <p>Our team will contact you soon</p>
        <hr>`;

 }  
      
    
           











