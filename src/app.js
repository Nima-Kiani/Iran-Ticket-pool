
async function getList(page){
    
    const response = await fetch(`https://iranticket.co/api/v1/Pool/poolList/?page=${page}`);
    const list = await response.json();
     console.log(list.pool);

    //  pagination
    const pages = document.querySelectorAll(".page-btn")
    
    pages.forEach(btn =>{
        btn.addEventListener('click' , ()=>{
            let num = Number(btn.textContent)
             console.log(num);

             getList(num);
        })
    })
    //  cards
    const cards = document.querySelectorAll(".card");
   
    // cards.forEach(card => {

    cards.forEach((card , index) =>{
            const resultId = list.pool[index];
            card.dataset.id = resultId;

            console.log(card.dataset.id)
            console.log(list.pool[index].id)
        

       
        // const resultId = list.pool.find(item =>{
        // return card.dataset.id == item.id
        // })

        // console.log(resultId)

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

getList(1);