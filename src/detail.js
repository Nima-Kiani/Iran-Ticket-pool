const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  //  Autoplay
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false, 
  }, 

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
// =====================================================

const params = new URLSearchParams(window.location.search);
// test
console.log(window.location.href);

const link = params.get("link");
// test 2
console.log(link)

async function getPoolDetails(){
    const response = await fetch(`https://iranticket.co/api/v1/Pool/pool/?link=${link}`);
    const data = await response.json();

    console.log(data)

    // Get main div classname
    const mainDiv = document.querySelector(".main-div");
    
    // Swiper
    const swiperHolder = mainDiv.querySelector(".swiper");
   
     const swiperWrapper = swiperHolder.querySelector(".swiper-wrapper")
     
     const swiperSlider = swiperWrapper.querySelectorAll(".swiper-slide")
    

    // img
     swiperSlider.forEach((slide , index) =>{
       const slideImg = slide.querySelector(".slide-img");
       const imgData =`https://iranticket.co/${data.poolImg[index].src}`;

       slideImg.src = imgData
       
    });

    // Address
    const contextBox = mainDiv.querySelector(".context");
    
    const addressBox = contextBox.querySelector(".address-box");
    
    const location = addressBox.querySelector(".address");
    location.textContent = data.add;

    // Tell
    const tellBox = contextBox.querySelector(".tel-phone");
    const numbedr = tellBox.querySelector(".phone-num");

    numbedr.textContent = data.tell;

    // Description
    const description = contextBox.querySelector(".description");
    
    description.innerHTML = data.description


}

getPoolDetails();