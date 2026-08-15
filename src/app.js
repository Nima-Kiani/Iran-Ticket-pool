
async function getList(){
    const response = await fetch("https://iranticket.co/api/v1/Pool/poolList/");
    const list = await response.json();
     console.log(list.pool);

    //  cards
    const cards = document.querySelectorAll(".card");
   
    cards.forEach(card => {

        const resultId = list.pool.find(item =>{
        return card.dataset.id == item.id
        })

        console.log(resultId)
        // img
        const img = card.querySelector(".card-img");
        // console.log(resultId.poolImg[0].src)
        img.src =  "https://iranticket.co/" + resultId.poolImg[0].src;

        // Title
        const textBox =card.querySelector(".text-box");
        
        const title =textBox.querySelector(".card-title");
        
        title.textContent = resultId.title;

        // Address
        const addressBox = textBox.querySelector(".address-box");
        const location = addressBox.querySelector(".address");

        location.textContent = resultId.add

        // Veiw pool 
        const buttonBox = card.querySelector(".button-box");
         
        const button = buttonBox.querySelector(".view-pool");
        button.href = `detail.html?link=${resultId.link}`;
    //    console.log(resultId.link)
       console.log(button.href);
        // console.log(resultId.link)

        

       

    });
    
   
    
    
};

getList();