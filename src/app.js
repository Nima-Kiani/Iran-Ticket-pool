
async function getList(page){
    
    const response = await fetch(`https://iranticket.co/api/v1/Pool/poolList/?page=${page}`);
    const list = await response.json();
     console.log(list.pool);

    //  pagination
    const pages = document.querySelectorAll(".page-btn")
    
    pages.forEach(btn =>{
        btn.addEventListener('click' , ()=>{
            let num = Number(btn.textContent)
            
             

             getList(num);
        })
    })

   
    //  cards
    const cards = document.querySelectorAll(".card");
   
    // cards.forEach(card => {

    cards.forEach((card , index) =>{
            const resultId = list.pool[index];
            card.dataset.id = resultId.id;

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

        //====== Filter =====
       
        const justPools = document.querySelector(".just-pools");
        
        const justWarterParks = document.querySelector(".just-water-parks");
        
        const justMassage = document.querySelector(".massage");
         // filter by all pools


         
        // Just pools
        justPools.addEventListener('click' ,()=> {
           const filterdPools = list.pool.filter(item =>{
               return  item.type === "pool";
            });
            console.log(filterdPools)

            // Hide all card
            cards.forEach(card =>{
                card.hidden = true;
            });

            // Show filterd cards
            filterdPools.forEach(pool =>{
                const card = document.querySelector(`[data-id="${pool.id}"]`);
                console.log(pool.id)
                console.log(card)
                

                 if (card) {
                     card.hidden = false;
                 }
            })
        });

        // Just waterparks
        justWarterParks.addEventListener('click' ,()=> {
           const filterdPools = list.pool.filter(item =>{
               return  item.type === "waterpark";
            });
            console.log(filterdPools)

            // Hide all card
            cards.forEach(card =>{
                card.hidden = true;
            });

            // Show filterd cards
            filterdPools.forEach(pool =>{
                const card = document.querySelector(`[data-id="${pool.id}"]`);
                console.log(pool.id)
                console.log(card)
                

                 if (card) {
                     card.hidden = false;
                 }
            })
            
        });

          // Just massage
        justMassage.addEventListener('click' ,()=> {
           const filterdPools = list.pool.filter(item =>{
               return  item.type === "massage";
            });
            console.log(filterdPools)

            // Hide all cards
            cards.forEach(card =>{
                card.hidden = true;
            });

            // Show filterd cards
            filterdPools.forEach(pool =>{
                const card = document.querySelector(`[data-id="${pool.id}"]`);
                console.log(pool.id)
                console.log(card)
                

                 if (card) {
                     card.hidden = false;
                 }
            })
        });


        // Filter by Ostan
        // Ostan List
        const ostanBtn = document.querySelector(".choose-ostan");
        const ostanList = document.querySelector(".ostan-list");
        ostanBtn.addEventListener('click',()=>{
            ostanList.classList.toggle("hidden");
            ostanList.classList.toggle("flex");
        });

        // Ostan Filter
        const ostanItem = document.querySelectorAll(".ostan-item");
         console.log(ostanItem)

        ostanItem.forEach(item =>{
            item.addEventListener('click',() => {
            const ostanName = item.dataset.ostan;
                const ostanFilter = list.pool.filter(pool =>{
                
                    cityList.innerHTML ="";
                return pool.ostan === ostanName;
               
                });

                
        // Hide all cards
        cards.forEach(card => {
            card.hidden = true;
        });

        // Show filtered cards
        ostanFilter.forEach(pool => {
            const card = document.querySelector(`[data-id="${pool.id}"]`);

                 if (card) {
                   card.hidden = false;
                 }
                });
             
            });
        });
       

        //===== City List =====
        const cityList = document.querySelector(".city-list");

        // Api city 
        // list.pool.forEach(item => {
        //     console.log(item.city);
        // });

    });
    
   
    
    
};

getList(1);